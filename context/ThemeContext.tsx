import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Appearance } from "react-native";
import { COLORS } from "../utils/constants/Colors";
import { useStorageData } from "../hooks/useStorageData";
import useCachedResources from "../hooks/base/useCachedResources";

export type ThemeType = "dark" | "light" | "no-preference";

export interface Theme {
  dark: boolean;
  colors: typeof COLORS.LIGHT | typeof COLORS.DARK;
  fonts: {
    regular: {
      fontFamily: string;
      fontWeight: string;
    };
    medium: {
      fontFamily: string;
      fontWeight: string;
    };
    bold: {
      fontFamily: string;
      fontWeight: string;
    };
    heavy: {
      fontFamily: string;
      fontWeight: string;
    };
  };
}

export interface ThemeContextValue {
  theme: Theme;
  themeType: ThemeType;
  isDarkTheme: boolean;
  toggleThemeType: () => void;
  setThemeType: React.Dispatch<React.SetStateAction<ThemeType>>;
}

export const ThemeContext = React.createContext<ThemeContextValue>({
  theme: {
    dark: false,
    colors: COLORS.LIGHT,
    fonts: {
      regular: { fontFamily: "", fontWeight: "bold" },
      medium: { fontFamily: "", fontWeight: "bold" },
      bold: { fontFamily: "", fontWeight: "bold" },
      heavy: { fontFamily: "", fontWeight: "bold" },
    },
  },
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
  const { loadedFonts } = useCachedResources(); // ✅ Fontları alıyoruz

  const colorScheme = Appearance.getColorScheme();
  const [themeType, setThemeType] = useState<ThemeType>(colorScheme || "light");

  useEffect(() => {
    const initState = async () => {
      try {
        const theme = (await getStorageData("theme")) as ThemeType;
        if (theme !== undefined) {
          setThemeType(theme);
        } else {
          await saveStorageData("theme", colorScheme);
          setThemeType(colorScheme || "light");
        }
      } catch (error) {
        console.error("❌ Error initializing theme:", error);
      }
    };

    (async () => {
      await initState();
    })();

    return () => {
      // console.log("🧹 Theme cleanup function running");
    };
  }, [colorScheme]);

  const toggleThemeType = useCallback(() => {
    setThemeType((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      saveStorageData("theme", newTheme);
      return newTheme;
    });
  }, []);

  const isDarkTheme = useMemo(() => themeType === "dark", [themeType]);

  // ✅ Fontları burada güncelliyoruz
  const theme = useMemo<Theme>(
    () => ({
      dark: isDarkTheme,
      colors: isDarkTheme ? COLORS.DARK : COLORS.LIGHT,
      fonts: {
        regular: { fontFamily: loadedFonts.regular, fontWeight: "bold" },
        medium: { fontFamily: loadedFonts.medium, fontWeight: "bold" },
        bold: { fontFamily: loadedFonts.bold, fontWeight: "bold" },
        heavy: { fontFamily: loadedFonts.heavy, fontWeight: "bold" },
      },
    }),
    [isDarkTheme, loadedFonts]
  );

  return (
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
  );
};
