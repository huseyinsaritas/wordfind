import { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import { useGlobalState } from "../global/globalState";

export const useSounds = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const { state } = useGlobalState();

  const gameRef = useRef<Audio.Sound | undefined>();
  const keyRef = useRef<Audio.Sound | undefined>();
  const removeRef = useRef<Audio.Sound | undefined>();
  const successRef = useRef<Audio.Sound | undefined>();
  const wrongRef = useRef<Audio.Sound | undefined>();
  const gameOverRef = useRef<Audio.Sound | undefined>();
  const gameWonRef = useRef<Audio.Sound | undefined>();
  const bonusRef = useRef<Audio.Sound | undefined>();
  const noBonusRef = useRef<Audio.Sound | undefined>();

  useEffect(() => {
    Audio.requestPermissionsAsync().then(() => {
      Audio.setAudioModeAsync({
        // allowsRecordingIOS: false, // default
        // interruptionModeIOS: undefined, // default
        // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        // playsInSilentModeIOS: true, // changed
        // staysActiveInBackground: false, // default
        // interruptionModeAndroid: undefined, // default
        // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        // shouldDuckAndroid: true, // default
        // playThroughEarpieceAndroid: false, // default
      });
    });
  }, []);

  useEffect(() => {
    const gameOverSoundPromise = Audio.Sound.createAsync(require("../../assets/music/game-over2.wav"));
    const gameWonSoundPromise = Audio.Sound.createAsync(require("../../assets/music/game-won.wav"));
    const gameSoundPromise = Audio.Sound.createAsync(require("../../assets/music/game.wav"));
    const keySoundPromise = Audio.Sound.createAsync(require("../../assets/music/click.wav"));
    const removeSoundPromise = Audio.Sound.createAsync(require("../../assets/music/remove.mp3"));
    const successSoundPromise = Audio.Sound.createAsync(require("../../assets/music/enter3.wav"));
    const wrongSoundPromise = Audio.Sound.createAsync(require("../../assets/music/wrong2.wav"));
    const bonusSoundPromise = Audio.Sound.createAsync(require("../../assets/music/bonus.wav"));
    const noBonusSoundPromise = Audio.Sound.createAsync(require("../../assets/music/nobonus.wav"));

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
    ])
      .then((results) => {
        gameRef.current = results[0].sound;
        keyRef.current = results[1].sound;
        removeRef.current = results[2].sound;
        successRef.current = results[3].sound;
        wrongRef.current = results[4].sound;
        gameOverRef.current = results[5].sound;
        gameWonRef.current = results[6].sound;
        bonusRef.current = results[7].sound;
        noBonusRef.current = results[8].sound;
        setLoaded(true);
        // console.log("all sounds loaded");

        if (state.sound === 1) results[0].sound.replayAsync();
      })
      .catch((err) => {
        // console.error(err);
      });

    return () => {
      gameRef.current?.unloadAsync();
      keyRef.current?.unloadAsync();
      removeRef.current?.unloadAsync();
      successRef.current?.unloadAsync();
      wrongRef.current?.unloadAsync();
      gameOverRef.current?.unloadAsync();
      gameWonRef.current?.unloadAsync();
      bonusRef.current?.unloadAsync();
      noBonusRef.current?.unloadAsync();
    };
  }, []);

  const play = async (sound: "game" | "key" | "remove" | "success" | "wrong" | "game-over" | "game-won" | "bonus" | "no-bonus") => {
    if (loaded && state.sound === 1) {
      switch (sound) {
        case "game":
          gameRef.current?.replayAsync().catch((err) => {
            // console.error("play." + sound + ".Error", err.message);
          });
          break;
        case "key":
          keyRef.current?.replayAsync().catch((err) => {
            // console.error("play." + sound + ".Error", err.message);
          });
          break;
        case "remove":
          removeRef.current?.replayAsync().catch((err) => {
            // console.error("play." + sound + ".Error", err.message);
          });
          break;
        case "success":
          successRef.current?.replayAsync().catch((err) => {
            // console.error("play." + sound + ".Error", err.message);
          });
          break;
        case "wrong":
          wrongRef.current?.replayAsync().catch((err) => {
            // console.error("play." + sound + ".Error", err.message);
          });
          break;
        case "game-over":
          gameOverRef.current?.replayAsync().catch((err) => {
            // console.error("play." + sound + ".Error", err.message);
          });
          break;
        case "game-won":
          gameWonRef.current?.replayAsync().catch((err) => {
            // console.error("play." + sound + ".Error", err.message);
          });
          break;
        case "bonus":
          bonusRef.current?.replayAsync().catch((err) => {
            // console.error("play." + sound + ".Error", err.message);
          });
          break;
        case "no-bonus":
          noBonusRef.current?.replayAsync().catch((err) => {
            // console.error("play." + sound + ".Error", err.message);
          });
          break;
        default:
          break;
      }
    }
  };

  return { soundsLoaded: loaded, play };
};
