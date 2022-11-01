import { Audio } from "expo-av";
import Sound from "react-native-sound";

export const playOneAv = (s: Audio.SoundObject) => {
  s.sound.replayAsync().catch((err) => {
    console.error("play." + s.status.isLoaded + ".Error", err.message);
  });
};

export const playOneSound = (s: Sound) => {
  if (s.isPlaying()) {
    s.setCurrentTime(0);
  } else {
    s.play((success) => {
      if (!success) {
        console.error("play click error");
      }
    });
  }
};
