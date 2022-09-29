import { useState, useEffect } from "react";
import { getInitialData } from "../data/getInitialData";
import { IAlert } from "../model/Alert";
import { IChar } from "../model/Char";
import { IGameData } from "../model/GameData";
import * as api from "../api";
import { deepCopy } from "../util";

export const useData = (len: number) => {
  const [gameLoading, setGameLoading] = useState(true);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [alertMessage, setAlertMessage] = useState<IAlert>({ show: false, status: 0 });
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
        api.isValidWord(data?.currentMay).then((valid: boolean) => {
          if (!valid) {
            setIsValid(false);
            setAlertMessage({ show: true, status: 2, message: "Kelime listesinde yok" });
            return false;
          }
          setData((prev) => {
            if (prev === undefined) return prev;
            const clone = deepCopy(prev);
            const addObj = clone.currentMay.split("");
            clone.currentMay = "";
            clone.mays.push(addObj);
            return clone;
          });

          setIsValid(true);
        });
      } else {
        setIsValid(false);
        setAlertMessage({ show: true, status: 1, message: "Yetersiz harf!" });
      }
    }

    return false;
  };

  const onCloseAlert = () => {
    setAlertMessage({ show: false, status: 0, message: "" });
    setIsValid(true);
  };

  const addCurrentMay = (char: IChar): boolean => {
    if (data === undefined) return false;
    setIsValid(true);
    if (data?.answer.length > data?.currentMay.length) {
      setData((prev) => {
        if (prev === undefined) return prev;

        const clone = { ...prev };
        const addObj = clone.currentMay.concat(char.c);
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
        const clone = { ...prev };
        const deletedObj = clone.currentMay?.slice(0, -1);
        clone.currentMay = deletedObj;
        return clone;
      });
    }
  };

  return { gameLoading, data, addCurrentMay, removeCurrentMay, submitData, newGame, alertMessage, onCloseAlert, isValid };
};
