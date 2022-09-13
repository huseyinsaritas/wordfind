import "expo-dev-client";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import * as SplashScreen from "expo-splash-screen";
import Navigation from "./src/navigation";
import useColorScheme from "./src/hooks/base/useColorScheme";
import useCachedResources from "./src/hooks/base/useCachedResources";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) return null;

  return (
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme} />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
