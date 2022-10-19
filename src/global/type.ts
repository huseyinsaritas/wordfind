import Sound from "react-native-sound";

export const GlobalStateStorageKeys = ["lan", "gameSounds", "sound", "deviceId", "username", "gameCount", "playedGameCount", "winCount"];

export type GameConf = {
  version: string; // v1.0.2
  adsCycle: number; // 3, // 2 game 1 ads
};

export type GameSounds = {
  game: Sound;
  key: Sound;
  remove: Sound;
  success: Sound;
  wrong: Sound;
  gameOver: Sound;
  gameWon: Sound;
  bonus: Sound;
  noBonus: Sound;
  click: Sound;
};

export type GlobalStateType = {
  loading: boolean;
  gameConf: GameConf;

  lan: string;
  sound: number;
  deviceId: string;
  username: string;
  gameCount: number;
  playedGameCount: number;
  winCount: number;
  gameSounds: GameSounds;
};
