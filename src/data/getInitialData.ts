import { IGameData } from "../model/GameData";
// import { randomItem } from "../util";
// import { fakeWordData } from "./data";
import * as api from "../api";

// const createEmptyRowData = (len: number) => {
//   const rowData = new Array(len);
//   for (let i = 0; i < rowData.length; i++) {
//     rowData[i] = new Array(len).fill({ char: "", color: "" });
//   }
//   return rowData;
// };

// export const getInitialData = async (len: number): Promise<IGameData | undefined> => {
//   const words = fakeWordData.find((d) => d.len === len)?.items;
//   if (words) {
//     const currentWord: string = randomItem<string>(words);
//     const initialData: IGameData = {
//       answer: currentWord.split(""),
//       mays: [],
//       currentMay: "",
//     };
//     return initialData;
//   }
// };

export const getInitialData = async (len: number): Promise<IGameData | undefined> => {
  const apiDatas = await api.getRandomGame(len);

  const initialData: IGameData = {
    answer: apiDatas.item.split(""),
    mays: [],
    currentMay: "",
  };
  return initialData;
};
