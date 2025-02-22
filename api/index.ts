import axios from "axios";
import { GameConf } from "../context/type";
import { CONF } from "../utils/conf";

const API_URL = CONF.API_BASE_URL;

export const getRandomGame = async (len: number, lan?: string): Promise<{ id: number; len: number; item: string }> => {
  return axios
    .get(API_URL + "/word/" + len + "/" + lan)
    .then((res) => {
      // console.log(res);
      return res.data.data as { id: number; len: number; item: string };
    })
    .catch((err) => {
      console.error("getRandomGame.Error", err);
      throw new Error(err);
    });
};

export const isValidWord = async (word: string, lan: string): Promise<boolean> => {
  return axios
    .get(API_URL + "/isValid/" + word + "/" + lan)
    .then((res) => {
      return res.data.data as boolean;
    })
    .catch((err) => {
      console.error("getRandomGame.Error", err);
      throw new Error(err);
    });
};

export const getGameConf = async (): Promise<GameConf> => {
  return axios
    .get(API_URL + "/conf")
    .then((res) => res.data.data as GameConf)
    .catch((err) => {
      console.error("getGameConf.Error", err);
      throw new Error(err);
    });
};
