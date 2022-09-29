import axios from "axios";
import { CONF } from "../conf";

const apiUrl = CONF.API_BASE_URL;

export const getRandomGame = async (len: number): Promise<{ id: number; len: number; item: string }> => {
  return axios
    .get(apiUrl + "/game/" + len)
    .then((res) => {
      return res.data.data as { id: number; len: number; item: string };
    })
    .catch((err) => {
      console.error("getRandomGame.Error", err);
      throw new Error(err);
    });
};

export const isValidWord = async (word: string): Promise<boolean> => {
  return axios
    .get(apiUrl + "/isValid/" + word)
    .then((res) => {
      return res.data.data as boolean;
    })
    .catch((err) => {
      console.error("getRandomGame.Error", err);
      throw new Error(err);
    });
};
