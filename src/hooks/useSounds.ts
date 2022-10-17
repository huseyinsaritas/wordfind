import { useState, useEffect, useRef } from "react";
import Sound from "react-native-sound";
import { useGlobalState } from "../global/globalState";

export const useSounds = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const { state } = useGlobalState();

  const gameRef = useRef<Sound | undefined>();
  const keyRef = useRef<Sound | undefined>();
  const removeRef = useRef<Sound | undefined>();
  const successRef = useRef<Sound | undefined>();
  const wrongRef = useRef<Sound | undefined>();
  const gameOverRef = useRef<Sound | undefined>();
  const gameWonRef = useRef<Sound | undefined>();
  const bonusRef = useRef<Sound | undefined>();
  const noBonusRef = useRef<Sound | undefined>();
  const clickRef = useRef<Sound | undefined>();

  // useEffect(() => {
  //   Sound.setCategory("Playback", true);
  //   return () => {
  //     if (gameRef) gameRef.current?.release();
  //     if (keyRef) keyRef.current?.release();
  //     if (removeRef) removeRef.current?.release();
  //     if (successRef) successRef.current?.release();
  //     if (wrongRef) wrongRef.current?.release();
  //     if (gameOverRef) gameOverRef.current?.release();
  //     if (gameWonRef) gameWonRef.current?.release();
  //     if (bonusRef) bonusRef.current?.release();
  //     if (noBonusRef) noBonusRef.current?.release();
  //     if (clickRef) clickRef.current?.release();
  //   };
  // }, []);

  useEffect(() => {
    Sound.setCategory("Playback", true);

    const gameSoundPromise = new Sound(require("../../assets/music/game.wav"));
    const keySoundPromise = new Sound(require("../../assets/music/key.wav"));
    const removeSoundPromise = new Sound(require("../../assets/music/remove.mp3"));
    const successSoundPromise = new Sound(require("../../assets/music/enter.wav"));
    const wrongSoundPromise = new Sound(require("../../assets/music/wrong.wav"));
    const gameOverSoundPromise = new Sound(require("../../assets/music/game-over2.wav"));
    const gameWonSoundPromise = new Sound(require("../../assets/music/game-won.wav"));
    const bonusSoundPromise = new Sound(require("../../assets/music/bonus.wav"));
    const noBonusSoundPromise = new Sound(require("../../assets/music/nobonus.wav"));
    const clickSoundPromise = new Sound(require("../../assets/music/click.wav"));

    Promise.all([
      gameSoundPromise,
      keySoundPromise,
      removeSoundPromise,
      successSoundPromise,
      wrongSoundPromise,
      gameOverSoundPromise,
      gameWonSoundPromise,
      bonusSoundPromise,
      noBonusSoundPromise,
      clickSoundPromise,
    ])
      .then((results) => {
        gameRef.current = results[0];
        keyRef.current = results[1];
        removeRef.current = results[2];
        successRef.current = results[3];
        wrongRef.current = results[4];
        gameOverRef.current = results[5];
        gameWonRef.current = results[6];
        bonusRef.current = results[7];
        noBonusRef.current = results[8];
        clickRef.current = results[9];
        setLoaded(true);
        console.log("all sounds loaded");

        // if (state.sound === 1) results[0].sound.replayAsync();
      })
      .catch((err) => {
        // console.error(err);
      });

    return () => {
      gameRef.current?.release();
      keyRef.current?.release();
      removeRef.current?.release();
      successRef.current?.release();
      wrongRef.current?.release();
      gameOverRef.current?.release();
      gameWonRef.current?.release();
      bonusRef.current?.release();
      noBonusRef.current?.release();
      clickRef.current?.release();
    };
  }, []);

  const play = async (sound: "game" | "key" | "remove" | "success" | "wrong" | "game-over" | "game-won" | "bonus" | "no-bonus" | "click") => {
    if (loaded && state.sound === 1) {
      switch (sound) {
        case "game":
          gameRef.current?.play((success) => {
            if (!success) {
              console.error("play game error");
            }
          });
          break;
        case "key":
          keyRef.current?.play((success) => {
            if (!success) {
              console.error("play key error");
            }
          });
          break;
        case "remove":
          removeRef.current?.play((success) => {
            if (!success) {
              console.error("play remove error");
            }
          });
          break;
        case "success":
          successRef.current?.play((success) => {
            if (!success) {
              console.error("play success error");
            }
          });
          break;
        case "wrong":
          wrongRef.current?.play((success) => {
            if (!success) {
              console.error("play wrong error");
            }
          });
          break;
        case "game-over":
          gameOverRef.current?.play((success) => {
            if (!success) {
              console.error("play game-over error");
            }
          });
          break;
        case "game-won":
          gameWonRef.current?.play((success) => {
            if (!success) {
              console.error("play game-won error");
            }
          });
          break;
        case "bonus":
          bonusRef.current?.play((success) => {
            if (!success) {
              console.error("play bonus error");
            }
          });
          break;
        case "no-bonus":
          noBonusRef.current?.play((success) => {
            if (!success) {
              console.error("play no-bonus error");
            }
          });
          break;
        case "click":
          clickRef.current?.play((success) => {
            if (!success) {
              console.error("play click error");
            }
          });
          break;
        default:
          break;
      }
    }
  };

  return { soundsLoaded: loaded, play };
};
