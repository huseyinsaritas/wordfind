import { useEffect } from "react";
import Sound from "react-native-sound";
import { useGlobalState } from "../global/globalState";

export const useSounds = () => {
  const { state } = useGlobalState();

  useEffect(() => {
    Sound.setCategory("Playback", true);
  }, []);

  const play = async (sound: "game" | "key" | "remove" | "success" | "wrong" | "game-over" | "game-won" | "bonus" | "no-bonus" | "click") => {
    if (state.sound === 1) {
      switch (sound) {
        case "game":
          if (state.gameSounds?.game.isPlaying()) {
            state.gameSounds?.game.setCurrentTime(0);
          } else {
            state.gameSounds?.game.play((success) => {
              if (!success) {
                console.error("play game error");
              }
            });
          }
          break;
        case "key":
          if (state.gameSounds?.key.isPlaying()) {
            state.gameSounds?.key.setCurrentTime(0);
          } else {
            state.gameSounds?.key.play((success) => {
              if (!success) {
                console.error("play key error");
              }
            });
          }
          break;
        case "remove":
          if (state.gameSounds?.remove.isPlaying()) {
            state.gameSounds?.remove.setCurrentTime(0);
          } else {
            state.gameSounds?.remove.play((success) => {
              if (!success) {
                console.error("play remove error");
              }
            });
          }
          break;
        case "success":
          if (state.gameSounds?.success.isPlaying()) {
            state.gameSounds?.success.setCurrentTime(0);
          } else {
            state.gameSounds?.success.play((success) => {
              if (!success) {
                console.error("play success error");
              }
            });
          }
          break;
        case "wrong":
          if (state.gameSounds?.wrong.isPlaying()) {
            state.gameSounds?.wrong.setCurrentTime(0);
          } else {
            state.gameSounds?.wrong.play((success) => {
              if (!success) {
                console.error("play wrong error");
              }
            });
          }
          break;
        case "game-over":
          if (state.gameSounds?.gameOver.isPlaying()) {
            state.gameSounds?.gameOver.setCurrentTime(0);
          } else {
            state.gameSounds?.gameOver.play((success) => {
              if (!success) {
                console.error("play game-over error");
              }
            });
          }
          break;
        case "game-won":
          if (state.gameSounds?.gameWon.isPlaying()) {
            state.gameSounds?.gameWon.setCurrentTime(0);
          } else {
            state.gameSounds?.gameWon.play((success) => {
              if (!success) {
                console.error("play game-won error");
              }
            });
          }
          break;
        case "bonus":
          if (state.gameSounds?.bonus.isPlaying()) {
            state.gameSounds?.bonus.setCurrentTime(0);
          } else {
            state.gameSounds?.bonus.play((success) => {
              if (!success) {
                console.error("play bonus error");
              }
            });
          }
          break;
        case "no-bonus":
          if (state.gameSounds?.noBonus.isPlaying()) {
            state.gameSounds?.noBonus.setCurrentTime(0);
          } else {
            state.gameSounds?.noBonus.play((success) => {
              if (!success) {
                console.error("play no-bonus error");
              }
            });
          }
          break;
        case "click":
          if (state.gameSounds?.click.isPlaying()) {
            state.gameSounds?.click.setCurrentTime(0);
          } else {
            state.gameSounds?.click.play((success) => {
              if (!success) {
                console.error("play click error");
              }
            });
          }
          break;
        default:
          break;
      }
    }
  };

  return { play };
};
