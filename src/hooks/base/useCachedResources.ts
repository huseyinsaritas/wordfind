import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export default function useCachedResources() {
  const [completed, setCompleted] = useState(false);
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    if (isLoadingComplete) {
      SplashScreen.hideAsync().finally(() => {
        setCompleted(true);
      });
    }
  }, [isLoadingComplete]);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          "AlfaSlabOne-Regular": require("../../../assets/fonts/AlfaSlabOne-Regular.ttf"),
          "RussoOne-Regular": require("../../../assets/fonts/RussoOne-Regular.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return { completed };
}
