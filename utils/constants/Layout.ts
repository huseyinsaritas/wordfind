import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};

export const FONT_FAMILY = {
  Black: "RussoOne-Regular",
};

export const DISCLOSE_TIME_MS = 750;
