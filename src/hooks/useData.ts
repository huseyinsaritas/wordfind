import { useState, useEffect } from "react";
import Toast from "react-native-root-toast";
import { getInitialData } from "../data/getInitialData";
import { IChar } from "../model/Char";
import { IGameData } from "../model/GameData";
import * as api from "../api";
import { deepCopy } from "../util";

export const useData = (len: number) => {
  const [gameLoading, setGameLoading] = useState(true);
  const [isValid, setIsValid] = useState<boolean>(true);

  const [data, setData] = useState<IGameData>();

  useEffect(() => {
    newGame();
  }, []);

  const newGame = async () => {
    setIsValid(true);
    setGameLoading(true);
    const data = await getInitialData(len);
    setData(data);
    setGameLoading(false);
  };
  console.log("data", data);
  const submitData = () => {
    if (data === undefined) return false;

    if (data.mays.length < data.answer.length) {
      if (data?.answer.length === data?.currentMay.length) {
        api.isValidWord(data?.currentMay.join("")).then((valid: boolean) => {
          if (!valid) {
            setIsValid(false);
            Toast.show("Kelime listesinde yok!", {
              duration: Toast.durations.LONG,
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
          setData((prev) => {
            if (prev === undefined) return prev;
            const clone = deepCopy(prev);
            const addObj = clone.currentMay;
            clone.currentMay = [];
            clone.mays.push(addObj);
            return clone;
          });

          setIsValid(true);
        });
      } else {
        setIsValid(false);
        Toast.show("Yetersiz harf!", {
          duration: Toast.durations.LONG,
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

  return { gameLoading, data, addCurrentMay, removeCurrentMay, submitData, newGame, isValid };
};
