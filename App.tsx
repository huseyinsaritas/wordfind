import "expo-dev-client";
import { StatusBar } from "expo-status-bar";
import React from "react";
import * as SplashScreen from "expo-splash-screen";
import Navigation from "./src/navigation";
import useCachedResources from "./src/hooks/base/useCachedResources";
import { FullBackground } from "./src/components/Base/FullBackGround/FullBackground";
import { GlobalStateProvider } from "./src/global/globalState";
import Toast from "react-native-toast-notifications";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { completed } = useCachedResources();

  if (!completed) return null;

  return (
    <FullBackground>
      <GlobalStateProvider>
        <Toast ref={(ref) => (window.toastr = ref)} />
        <Navigation />
        <StatusBar />
      </GlobalStateProvider>
    </FullBackground>
  );
}
