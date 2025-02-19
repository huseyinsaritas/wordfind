import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStorageData = () => {
  const saveStorageData = async <T>(key: string, value: T) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify({ key, value }));
      // console.log("saveStorageData", key, JSON.stringify({ key, value }));
    } catch (e) {
      // saving error
      // console.error("saveStorageData.error", e);
    }
  };

  const getStorageData = async <T>(key: string): Promise<T | undefined> => {
    try {
      const item = await AsyncStorage.getItem(key);
      if (item !== null) {
        // console.log("getStorageData", key, item);
        return JSON.parse(item).value as T;
        // value previously stored
      }
    } catch (e) {
      // error reading value
      // console.error("getStorageData.error", e);
    }
  };

  const resetStorageData = async () => {
    try {
      await AsyncStorage.clear();
      // console.log("saveStorageData", key, JSON.stringify({ key, value }));
    } catch (e) {
      // saving error
      // console.error("resetStorageData.error", e);
    }
  };

  return { saveStorageData, getStorageData, resetStorageData };
};
