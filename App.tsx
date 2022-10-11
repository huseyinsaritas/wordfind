import "expo-dev-client";
import { StatusBar } from "expo-status-bar";
import React from "react";
import * as SplashScreen from "expo-splash-screen";
import Navigation from "./src/navigation";
import useColorScheme from "./src/hooks/base/useColorScheme";
import useCachedResources from "./src/hooks/base/useCachedResources";
import { RootSiblingParent } from "react-native-root-siblings";
import { FullBackground } from "./src/components/Base/FullBackGround/FullBackground";
import { GlobalStateProvider } from "./src/global/globalState";
import { Dimensions } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) return null;
  const height = Dimensions.get("window").height;
  // console.log("height", height);

  return (
    <RootSiblingParent>
      <FullBackground>
        <GlobalStateProvider>
          <Navigation />
          <StatusBar />
        </GlobalStateProvider>
      </FullBackground>
    </RootSiblingParent>
  );
}
