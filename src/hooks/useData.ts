import { useState, useEffect } from "react";
import { getInitialData } from "../data/getInitialData";
import { GameData } from "../model/GameData";

export const useData = (len: number) => {
  const [gameLoading, setGameLoading] = useState(true);
  const [data, setData] = useState<GameData>();

  const newGame = async () => {
    setGameLoading(true);
    const data = await getInitialData(len);
    setData(data);
    setGameLoading(false);
  };

  useEffect(() => {
    newGame();
  }, []);

  // const addMay = (word: string): boolean => {
  //   if (data === undefined) return false;
  //   const keys = word.split(",");
  //   if (data.answer.length === keys.length) {
  //     setData((prev) => {
  //       if (prev === undefined) return prev;
  //       const clone = { ...prev, word: [...prev.chars] };
  //       const addObj = { ...clone.rows };
  //       clone.chars[index].c = "";
  //       clone.mays.push(addObj);
  //       return clone;
  //     });
  //     return true;
  //   }
  //   return false;
  // };

  return { gameLoading, data /*, addMay*/, newGame };
};
