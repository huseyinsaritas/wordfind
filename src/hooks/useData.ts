import { useState, useEffect } from "react";
import Toast from "react-native-root-toast";
import { getInitialData } from "../data/getInitialData";
import { IGameData } from "../model/GameData";
import { deepCopy } from "../util";
import { useGlobalState } from "../global/globalState";
import * as api from "../api";
import { DISCLOSE_TIME_MS } from "../constants/Layout";
import { useSounds } from "./useSounds";

export const useData = (len: number) => {
  const { state } = useGlobalState();
  const [gameLoading, setGameLoading] = useState(true);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [keysDisabled, setKeysDisabled] = useState(false);
  const [data, setData] = useState<IGameData>();
  const { play, soundsLoaded } = useSounds();

  console.log("soundsLoaded", soundsLoaded);

  useEffect(() => {
    newGame();
  }, []);

  const newGame = async () => {
    setGameLoading(true);
    const data = await getInitialData(len, state.lan ?? "");
    setData(data);
    setGameLoading(false);
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

            setData((prev) => {
              if (prev === undefined) return prev;
              const clone = deepCopy(prev);
              const addObj = clone.currentMay;
              clone.currentMay = [];
              clone.mays.push(addObj);
              return clone;
            });
          } else {
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

  return { gameLoading, data, addCurrentMay, removeCurrentMay, submitData, newGame, isValid, keysDisabled };
};
