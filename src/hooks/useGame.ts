import { useEffect, useState } from "react";
import Toast from "react-native-root-toast";
import { DISCLOSE_TIME_MS } from "../constants/Layout";
import { IGameData } from "../model/GameData";
import { useData } from "./useData";

export const useGame = (len: number) => {
  const { gameLoading, data, addCurrentMay, removeCurrentMay, submitData, newGame, isValid } = useData(len);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);

  useEffect(() => {
    setGameFinished(false);

    if (data) {
      const finished = checkGameFinished(data);
      if (finished) {
        setGameFinished(true);
      }
    }
  }, [data?.mays.length]);

  const checkGameFinished = (data: IGameData): boolean => {
    if (data === undefined) return false;
    if (data.mays.length === 0) return false;
    let finished = false;

    const may = data.mays[data.mays.length - 1].map((m) => m);

    if (may.length > 0) {
      if (may.join("") === data.answer.join("")) {
        finished = true;
        setGameWon(true);
        Toast.show("Kazandınız!", {
          duration: Toast.durations.LONG,
          position: 40,
          shadow: true,
          animation: true,
          hideOnPress: true,
          backgroundColor: "#fff",
          textColor: "#000",
          opacity: 1,
          delay: DISCLOSE_TIME_MS * data.answer.length - 1000,
        });
      } else {
        if (data.mays.length === data.answer.length) {
          finished = true;
          setGameWon(false);
          Toast.show("Kaybettiniz!", {
            duration: Toast.durations.LONG,
            position: 40,
            shadow: true,
            animation: true,
            hideOnPress: true,
            backgroundColor: "#fff",
            textColor: "#000",
            opacity: 1,
            delay: DISCLOSE_TIME_MS * data.answer.length - 1000,
          });
        }
      }
    }

    return finished;
  };

  return { gameLoading, gameFinished, data, addCurrentMay, removeCurrentMay, submitData, newGame, isValid, gameWon };
};
