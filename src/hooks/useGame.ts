import { useEffect, useState } from "react";
import { DISCLOSE_TIME_MS } from "../constants/Layout";
import { IGameData } from "../model/GameData";
import { useData } from "./useData";

export const useGame = (len: number) => {
  const { gameLoading, data, addCurrentMay, removeCurrentMay, submitData, newGame, alertMessage, onCloseAlert, isValid } = useData(len);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);

  useEffect(() => {
    setGameFinished(false);
    // let t: NodeJS.Timeout | undefined;

    if (data) {
      const finished = checkGameFinished(data);
      if (finished) {
        setGameFinished(true);
        // setTimeout(() => {
        //   setGameFinished(true);
        // }, DISCLOSE_TIME_MS * data.answer.length);
      }
    }
    // return () => {
    //   if (t) clearTimeout(t);
    // };
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
      } else {
        if (data.mays.length === data.answer.length) {
          finished = true;
          setGameWon(false);
        }
      }
    }

    return finished;
  };

  return { gameLoading, gameFinished, data, addCurrentMay, removeCurrentMay, submitData, newGame, alertMessage, onCloseAlert, isValid, gameWon };
};
