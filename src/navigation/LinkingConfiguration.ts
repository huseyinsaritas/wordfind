/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { AppStackParamList } from "../types";

const linking: LinkingOptions<AppStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: "home",
            },
          },
          Game: {
            screens: {
              GameScreen: "game",
            },
          },
          Info: {
            screens: {
              InfoScreen: "info",
            },
          },
          Settings: {
            screens: {
              InfoScreen: "settings",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};

export default linking;
