export const GlobalStateStorageKeys = ["lan", "sound", "deviceId", "username", "version", "adsCycle", "gameCount"];

export type GameConf = {
  version: string; // v1.0.2
  timeSecond: number; // 200,
  adsCycle: number; // 3, // 2 game 1 ads
};

export type GlobalStateType = {
  loading: boolean;
  // gameConf: GameConf;
  version: string;
  adsCycle: number;
  lan: string;
  sound: number;
  deviceId: string;
  username: string;
  gameCount: number;
};
