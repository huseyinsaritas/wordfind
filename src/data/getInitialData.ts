import { GameData } from "../model/GameData";
import { randomItem } from "../util";
import { fakeWordData } from "./data";

const createEmptyRowData = (len: number) => {
  const rowData = new Array(len);
  for (let i = 0; i < rowData.length; i++) {
    rowData[i] = new Array(len).fill({ char: "", color: "" });
  }
  return rowData;
};

export const getInitialData = async (len: number): Promise<GameData | undefined> => {
  const words = fakeWordData.find((d) => d.len === len)?.items;
  if (words) {
    const currentWord: string = randomItem<string>(words);
    const initialData: GameData = {
      answer: currentWord.split(""),
      rows: createEmptyRowData(len),
      mays: [],
    };
    return initialData;
  }
};
