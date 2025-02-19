import { GlobalStateType } from "./type";
import { useStorageData } from "../hooks/useStorageData";
import { getNewDeviceId } from "../utils/helper/getNewDeviceId";
import * as Localization from "expo-localization";
import { SupportedLanguages } from "../utils/translations";
import { getGameConf } from "../api";
import { OneTrackPlayer } from "../class/OneTrackPlayer"; // ✅ Yeni TrackPlayer sınıfını dahil ettik

export const fetchInitialState = async (): Promise<GlobalStateType> => {
  const { getStorageData, saveStorageData } = useStorageData();

  const oneTrackPlayer = await OneTrackPlayer.getInstance();
  const trackIds = oneTrackPlayer.getAllSoundIds();

  const getAndCheckStorageData = async <T>(key: string): Promise<T> => {
    const val = await getStorageData<T>(key);

    if (val !== undefined) return val;

    try {
      if (key === "lan") {
        let deviceLan = Localization.locale.split("-")[0];
        if (!SupportedLanguages.map((x) => x.value).includes(deviceLan)) deviceLan = SupportedLanguages[0].value;
        await saveStorageData(key, deviceLan);
        return deviceLan as T;
      }

      if (key === "soundsOn") {
        await saveStorageData(key, 1);
        return 1 as T;
      }

      if (key === "deviceId") {
        const newDeviceId = getNewDeviceId();
        await saveStorageData(key, newDeviceId);
        return newDeviceId as T;
      }

      if (key === "username") {
        const rand = getNewDeviceId().substring(0, 8);
        const newUsername = "user_" + rand;
        await saveStorageData(key, newUsername);
        return newUsername as T;
      }

      if (key === "gameCount") {
        await saveStorageData(key, 0);
        return 0 as T;
      }

      if (key === "playedGameCount") {
        await saveStorageData(key, 0);
        return 0 as T;
      }

      if (key === "winCount") {
        await saveStorageData(key, 0);
        return 0 as T;
      }
    } catch (error) {
      console.error("getAndCheckStorageData.Error", error);
    }

    return val as T;
  };

  const gameConf = await getGameConf();

  const lan = await getAndCheckStorageData<string>("lan");
  const soundsOn = await getAndCheckStorageData<number>("soundsOn");
  const deviceId = await getAndCheckStorageData<string>("deviceId");
  const username = await getAndCheckStorageData<string>("username");
  const gameCount = await getAndCheckStorageData<number>("gameCount");
  const playedGameCount = await getAndCheckStorageData<number>("playedGameCount");
  const winCount = await getAndCheckStorageData<number>("winCount");

  return {
    loading: false,
    gameConf,
    lan,
    soundsOn,
    deviceId,
    username,
    gameCount,
    playedGameCount,
    winCount,
    allSounds: trackIds,
  };
};
