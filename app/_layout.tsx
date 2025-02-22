import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { FullBackground } from "../components/Base/FullBackGround/FullBackground";
import { GlobalStateProvider } from "../context/globalState";
import { ThemeContextProvider } from "../context/ThemeContext";
import Toast from "react-native-toast-notifications";
import useCachedResources from "../hooks/base/useCachedResources";
import TrackPlayer, { AppKilledPlaybackBehavior, Capability } from "react-native-track-player";

SplashScreen.preventAutoHideAsync();

// Setup TrackPlayer
const setupPlayer = async () => {
  try {
    const isSetup = await TrackPlayer.isServiceRunning();
    if (!isSetup) {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
        compactCapabilities: [Capability.Play, Capability.Pause, Capability.Stop],
      });
    }
  } catch (e) {
    console.log("Error setting up player:", e);
  }
};

setupPlayer();

// Must be required like this
require("@/utils/trackService");

export default function Layout() {
  const { completed } = useCachedResources();

  useEffect(() => {
    if (completed) {
      SplashScreen.hideAsync();
    }
  }, [completed]);

  if (!completed) return null;

  return (
    <ThemeContextProvider>
      <FullBackground>
        <GlobalStateProvider>
          <Toast ref={(ref) => (window.toastr = ref as any)} />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ title: "Home" }} />
            <Stack.Screen name="game-pre" options={{ animation: "fade", gestureEnabled: false }} />
            <Stack.Screen name="game" options={{ animation: "fade", gestureEnabled: false }} />
            <Stack.Screen name="info" />
            <Stack.Screen name="settings" />
            <Stack.Screen name="not-found" options={{ title: "Oops!" }} />
          </Stack>
          <StatusBar />
        </GlobalStateProvider>
      </FullBackground>
    </ThemeContextProvider>
  );
}
