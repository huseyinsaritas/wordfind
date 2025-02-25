import { useState, useEffect } from "react";
import { getInitialData } from "../utils/data/getInitialData";
import { IGameData } from "../utils/model/GameData";
import { deepCopy, getMayRows } from "../utils/index";
import { useGlobalState } from "../context/globalState";
import * as api from "../api";
import { DISCLOSE_TIME_MS } from "../utils/constants/Layout";
import { useTime } from "./useTime";
import { useLanguage } from "./useLanguage";
import { useShake } from "./useShake";
import { useTheme } from "./useTheme";

export const useData = (len: number) => {
  const { state, playSound } = useGlobalState();
  const [gameLoading, setGameLoading] = useState(true);
  const [keysDisabled, setKeysDisabled] = useState(false);
  const [data, setData] = useState<IGameData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { timer, pauseTimer, resetTime, startTimer } = useTime();
  const { t } = useLanguage();
  const { shake, setShaked } = useShake();
  const { theme } = useTheme();

  useEffect(() => {
    // Use IIFE pattern for async function
    (async () => {
      await newGame();
      playSound("game");
    })();
  }, []);

  const newGame = async () => {
    setGameLoading(true);
    const data = await getInitialData(len, state.lan ?? "");
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
        setIsSubmitting(true);
        api
          .isValidWord(data?.currentMay.join(""), state.lan ?? "")
          .then((valid: boolean) => {
            setIsSubmitting(false);
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
          })
          .catch((error) => {
            setIsSubmitting(false); // Hata durumunda da loading state'i kapatıyoruz.
            playSound("wrong");
            setKeysDisabled(false);
            // Kullanıcıya bir hata mesajı gösteriyoruz:
            window.toastr?.show(t("serverErrorMessage"), {
              type: "danger",
              animationType: "zoom-in",
              placement: "top",
              animationDuration: 200,
              duration: 2000,
              style: {
                backgroundColor: theme.colors.notification,
              },
              textStyle: {
                color: theme.colors.primary,
              },
            });
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

  return { gameLoading, data, addCurrentMay, removeCurrentMay, removeAllCurrentMay, submitData, newGame, shake, keysDisabled, timer, pauseTimer, isSubmitting };
};
