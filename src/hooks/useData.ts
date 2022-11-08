import { useState, useEffect } from "react";
import { getInitialData } from "../data/getInitialData";
import { IGameData } from "../model/GameData";
import { deepCopy, getMayRows } from "../util";
import { useGlobalState } from "../global/globalState";
import * as api from "../api";
import { DISCLOSE_TIME_MS } from "../constants/Layout";

import { useTime } from "./useTime";
import { useLanguage } from "./useLanguage";
import { useShake } from "./useShake";

export const useData = (len: number) => {
  const { state, playSound } = useGlobalState();
  const [gameLoading, setGameLoading] = useState(true);
  const [keysDisabled, setKeysDisabled] = useState(false);
  const [data, setData] = useState<IGameData>();

  const { timer, pauseTimer, resetTime, startTimer } = useTime();
  const { t } = useLanguage();
  const { shake, setShaked } = useShake();

  useEffect(() => {
    newGame();
    playSound("game");
  }, []);
  console.log(data);

  const newGame = async () => {
    setGameLoading(true);
    const data = await getInitialData(len, state.lan ?? "");
    // console.log("newGame.data", data);
    setData(data);
    setGameLoading(false);
    resetTime();
    startTimer();
  };

  const submitData = () => {
    if (data === undefined) return false;

    if (data.mays.length < data.answer.length) {
      if (data?.answer.length === data?.currentMay.length) {
        setKeysDisabled(true);

        api.isValidWord(data?.currentMay.join(""), state.lan ?? "").then((valid: boolean) => {
          if (valid === true) {
            setData((prev) => {
              if (prev === undefined) return prev;
              const clone = deepCopy(prev);
              const addObj = clone.currentMay;
              clone.currentMay = [];
              const mayObj = getMayRows(data.answer, addObj);
              clone.mays.push(mayObj);
              return clone;
            });

            setTimeout(() => {
              setKeysDisabled(false);
            }, DISCLOSE_TIME_MS * data.answer.length);

            playSound("success");
          } else {
            playSound("wrong");
            setKeysDisabled(false);
            setShaked(t("notInWordList"));
            return false;
          }
        });
      } else {
        playSound("wrong");
        setShaked(t("notEnoughLetters"));
      }
    }
    return false;
  };

  const addCurrentMay = (char: string): boolean => {
    if (data === undefined) return false;

    if (data?.answer.length > data?.currentMay.length) {
      setData((prev) => {
        if (prev === undefined) return prev;
        const clone = deepCopy(prev);
        const addObj = [...clone.currentMay];
        addObj.push(char);
        clone.currentMay = addObj;
        return clone;
      });
      playSound("key");

      return true;
    }

    return false;
  };

  const removeCurrentMay = () => {
    if (data === undefined) return false;

    if (0 < data.currentMay.length) {
      setData((prev) => {
        if (prev === undefined) return prev;
        const clone = deepCopy(prev);
        const deletedObj = [...clone.currentMay];
        deletedObj.pop();
        clone.currentMay = deletedObj;
        return clone;
      });
      playSound("remove");
    }
  };

  const removeAllCurrentMay = () => {
    if (data === undefined) return false;

    if (0 < data.currentMay.length) {
      setData((prev) => {
        if (prev === undefined) return prev;
        const clone = deepCopy(prev);
        clone.currentMay = [];
        return clone;
      });
      playSound("remove");
    }
  };

  return { gameLoading, data, addCurrentMay, removeCurrentMay, removeAllCurrentMay, submitData, newGame, shake, keysDisabled, timer, pauseTimer };
};
