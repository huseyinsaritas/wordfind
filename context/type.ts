// import Sound from "react-native-sound";
import { Audio } from "expo-av";

export const GlobalStateStorageKeys = ["lan", "soundsOn", "deviceId", "username", "gameCount", "playedGameCount", "winCount"];

export type GameConf = {
  version: string; // v1.0.2
  adsCycle: number; // 3, // 2 game 1 ads
};

export type GlobalStateType = {
  loading: boolean;
  gameConf: GameConf;
  lan: string;
  soundsOn: number;
  deviceId: string;
  username: string;
  gameCount: number;
  playedGameCount: number;
  winCount: number;
  // allSounds: { [key: string]: number };
  allSounds: Audio.SoundObject[];
};
