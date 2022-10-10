import React, { useCallback, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { NavigationContainer, Theme as NavigationTheme } from "@react-navigation/native";
import { COLORS } from "../constants/Colors";
import LinkingConfiguration from "../navigation/LinkingConfiguration";
import { useStorageData } from "../hooks/useStorageData";

export type Theme = NavigationTheme & {};

const lightTheme: Theme = {
  dark: false,
  colors: COLORS.LIGHT,
};

const darkTheme: Theme = {
  dark: true,
  colors: COLORS.DARK,
};

export type ThemeType = "dark" | "light";

export interface ThemeContextValue {
  theme: Theme;
  themeType: ThemeType;
  isDarkTheme: boolean;
  toggleThemeType: () => void;
  setThemeType: React.Dispatch<React.SetStateAction<ThemeType>>;
}

export const ThemeContext = React.createContext<ThemeContextValue>({
  theme: lightTheme,
  themeType: "light",
  isDarkTheme: false,
  setThemeType: () => {},
  toggleThemeType: () => {},
});

export interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
  const { getStorageData, saveStorageData } = useStorageData();

  // const val = (await getStorageData("theme")) as ThemeType;
  // if (val !== undefined) return val;
  const colorScheme = useColorScheme();
  // await saveStorageData("theme", colorScheme);

  const [themeType, setThemeType] = useState<ThemeType>(colorScheme || "light");

  const toggleThemeType = useCallback(() => {
    // saveStorageData("theme", (prev: ThemeType) => (prev === "dark" ? "light" : "dark"));
    setThemeType((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const isDarkTheme = useMemo(() => themeType === "dark", [themeType]);
  const theme = useMemo(() => (isDarkTheme ? darkTheme : lightTheme), [isDarkTheme]);

  return (
    <NavigationContainer linking={LinkingConfiguration} theme={theme}>
      <ThemeContext.Provider
        value={{
          theme,
          themeType,
          isDarkTheme,
          setThemeType,
          toggleThemeType,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </NavigationContainer>
  );
};
