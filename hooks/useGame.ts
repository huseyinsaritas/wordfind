import { useEffect, useState } from "react";
import { DISCLOSE_TIME_MS } from "../utils/constants/Layout";
import { useGlobalState } from "../context/globalState";
import { IGameData } from "../utils/model/GameData";
import { useData } from "./useData";
import { useLanguage } from "./useLanguage";
import { useTheme } from "./useTheme";

export const useGame = (len: number) => {
  const { gameLoading, data, addCurrentMay, removeCurrentMay, removeAllCurrentMay, submitData, newGame, shake, keysDisabled, timer, pauseTimer, isSubmitting } = useData(len);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const { state, setState } = useGlobalState();
  const { t } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    setGameFinished(false);
    if (data) {
      const finished = checkGameFinished(data);
      if (finished) {
        pauseTimer();
        setGameFinished(true);
        const newPlayedGameCount = (state.playedGameCount ?? 0) + 1;
        setState((prev) => ({ ...prev, playedGameCount: newPlayedGameCount }));
      }
    }
  }, [data?.mays.length]);

  const checkGameFinished = (data: IGameData): boolean => {
    if (data === undefined) return false;
    if (data.mays.length === 0) return false;
    let finished = false;

    const may = data.mays[data.mays.length - 1].chars.map((m) => m.char);

    if (may.length > 0) {
      if (may.join("") === data.answer.join("")) {
        finished = true;
        setGameWon(true);
        const newWinCount = (state.winCount ?? 0) + 1;
        setState((prev) => ({ ...prev, winCount: newWinCount }));
        window.toastr?.show(t("youWin"), {
          type: "normal",
          animationType: "zoom-in",
          placement: "top",
          animationDuration: 200,
          duration: DISCLOSE_TIME_MS * data.answer.length,
          style: {
            backgroundColor: theme.colors.notification,
          },
          textStyle: {
            color: theme.colors.primary,
          },
        });
      } else {
        if (data.mays.length === data.answer.length) {
          finished = true;
          setGameWon(false);
          window.toastr?.show(t("youLost"), {
            type: "normal",
            animationType: "zoom-in",
            placement: "top",
            animationDuration: 200,
            duration: DISCLOSE_TIME_MS * data.answer.length,
            style: {
              backgroundColor: theme.colors.notification,
            },
            textStyle: {
              color: theme.colors.primary,
            },
          });
        }
      }
    }

    return finished;
  };

  return { gameLoading, gameFinished, data, addCurrentMay, removeCurrentMay, removeAllCurrentMay, submitData, newGame, shake, gameWon, keysDisabled, timer, isSubmitting };
};
