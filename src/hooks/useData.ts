import { useState, useEffect } from "react";
import Toast from "react-native-root-toast";
import { getInitialData } from "../data/getInitialData";
import { IGameData } from "../model/GameData";
import { deepCopy, getMayRows } from "../util";
import { useGlobalState } from "../global/globalState";
import * as api from "../api";
import { DISCLOSE_TIME_MS } from "../constants/Layout";
import { useSounds } from "./useSounds";
import { useTime } from "./useTime";

export const useData = (len: number) => {
  const { state } = useGlobalState();
  const [gameLoading, setGameLoading] = useState(true);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [keysDisabled, setKeysDisabled] = useState(false);
  const [data, setData] = useState<IGameData>();
  const { play, soundsLoaded } = useSounds();
  const { timer, pauseTimer, startTimer } = useTime();
  // console.log("data", data);
  // console.log("playedGameCount", state.playedGameCount);
  // console.log("winCount", state.winCount);

  useEffect(() => {
    newGame();
  }, []);

  const newGame = async () => {
    setGameLoading(true);
    const data = await getInitialData(len, state.lan ?? "");
    // const data = { answer: ["K", "O", "K", "A", "İ", "N"], currentMay: [], mays: [] };
    console.log("newGame.data", data);
    setData(data);
    setGameLoading(false);
    startTimer();
  };

  const submitData = () => {
    if (data === undefined) return false;

    if (data.mays.length < data.answer.length) {
      if (data?.answer.length === data?.currentMay.length) {
        api.isValidWord(data?.currentMay.join(""), state.lan ?? "").then((valid: boolean) => {
          if (valid === true) {
            setIsValid(true);
            setKeysDisabled(true);
            setTimeout(() => {
              setKeysDisabled(false);
            }, DISCLOSE_TIME_MS * data.answer.length);

            if (soundsLoaded) {
              play("success");
            }

            setData((prev) => {
              if (prev === undefined) return prev;
              const clone = deepCopy(prev);
              const addObj = clone.currentMay;
              clone.currentMay = [];
              const mayObj = getMayRows(data.answer, addObj);
              // console.log(mayObj);

              clone.mays.push(mayObj);
              return clone;
            });
          } else {
            if (soundsLoaded) {
              play("wrong");
            }
            setIsValid(false);
            Toast.show("Kelime listesinde yok!", {
              duration: Toast.durations.SHORT,
              position: 40,
              shadow: true,
              animation: true,
              hideOnPress: true,
              backgroundColor: "#fff",
              textColor: "#000",
              opacity: 1,
            });
            return false;
          }
        });
      } else {
        if (soundsLoaded) {
          play("wrong");
        }
        Toast.show("Yetersiz harf!", {
          duration: Toast.durations.SHORT,
          position: 40,
          shadow: true,
          animation: true,
          hideOnPress: true,
          backgroundColor: "#fff",
          textColor: "#000",
          opacity: 1,
        });
      }
    }

    return false;
  };

  const addCurrentMay = (char: string): boolean => {
    if (data === undefined) return false;
    setIsValid(true);
    if (data?.answer.length > data?.currentMay.length) {
      setData((prev) => {
        if (prev === undefined) return prev;
        const clone = deepCopy(prev);
        const addObj = [...clone.currentMay];
        addObj.push(char);
        clone.currentMay = addObj;
        return clone;
      });
      return true;
    }
    return false;
  };

  const removeCurrentMay = () => {
    if (data === undefined) return false;
    setIsValid(true);
    if (0 < data.currentMay.length) {
      setData((prev) => {
        if (prev === undefined) return prev;
        const clone = deepCopy(prev);
        const deletedObj = [...clone.currentMay];
        deletedObj.pop();
        clone.currentMay = deletedObj;
        return clone;
      });
    }
  };

  return { gameLoading, data, addCurrentMay, removeCurrentMay, submitData, newGame, isValid, keysDisabled, timer, pauseTimer };
};
