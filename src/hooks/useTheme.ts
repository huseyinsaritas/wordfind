import { useContext } from "react";
import { StyleProp } from "react-native";
import { ThemeContext } from "../theme/ThemeContext";

export const useTheme = () => useContext(ThemeContext);

export const useThemedStyles = (styles: any) => {
  const { theme } = useTheme();
  return styles(theme);
};
