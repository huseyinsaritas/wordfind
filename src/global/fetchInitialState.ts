import { GlobalStateType } from "./type";
import { useStorageData } from "../hooks/useStorageData";
import { getNewDeviceId } from "../helper/getNewDeviceId";
import * as Localization from "expo-localization";
import { SupportedLanguages } from "../translations";
import { COLORS } from "../constants/Colors";

export const fetchInitialState = async (): Promise<GlobalStateType> => {
  const { getStorageData, saveStorageData /* , resetStorageData */ } = useStorageData();

  const getAndCheckStorageData = async <T>(key: string): Promise<T> => {
    const val = await getStorageData<T>(key);

    if (val !== undefined) return val;

    try {
      if (key === "lan") {
        let deviceLan = Localization.locale.split("-")[0];
        if (!SupportedLanguages.map((x) => x.code).includes(deviceLan)) deviceLan = SupportedLanguages[0].code;
        await saveStorageData(key, deviceLan);
        return deviceLan as T;
      }

      if (key === "sound") {
        await saveStorageData(key, 1);
        return 1 as T;
      }

      if (key === "deviceId") {
        const newDeviceId = getNewDeviceId();
        // console.log("newDeviceId", newDeviceId);
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

      if (key === "version") {
        const version = "1.0.0";
        await saveStorageData(key, version);
        return version as T;
      }

      if (key === "adsCycle") {
        await saveStorageData(key, 3);
        return 3 as T;
      }
    } catch (error) {
      // console.error("getAndCheckStorageData.Error", error);
    }

    return val as T;
  };

  // await resetStorageData();
  // const gameConf = await getGameConf();
  // console.log("gameConf", gameConf);

  const lan = await getAndCheckStorageData<string>("lan");
  const sound = await getAndCheckStorageData<number>("sound");
  const deviceId = await getAndCheckStorageData<string>("deviceId");
  const username = await getAndCheckStorageData<string>("username");
  const gameCount = await getAndCheckStorageData<number>("gameCount");
  const version = await getAndCheckStorageData<string>("version");
  const adsCycle = await getAndCheckStorageData<number>("adsCycle");

  // console.log("lan", lan);
  // console.log("sound", sound);
  // console.log("deviceId", deviceId);
  // console.log("username", username);
  // console.log("version", version);
  // console.log("adsCycle", adsCycle);
  // console.log("gameCount", gameCount);

  return {
    loading: false,
    // gameConf,
    lan,
    sound,
    deviceId,
    username,
    version,
    adsCycle,
    gameCount,
  };
};
