import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import { useEffect, useState } from "react";

export default function useCachedResources() {
  const [completed, setCompleted] = useState(false);
  const [loadedFonts, setLoadedFonts] = useState({
    regular: "",
    medium: "",
    bold: "",
    heavy: "",
  });

  useEffect(() => {
    function loadResourcesAndDataAsync() {
      return Promise.all([
        Font.loadAsync({
          ...FontAwesome.font,
          "AlfaSlabOne-Regular": require("../../assets/fonts/AlfaSlabOne-Regular.ttf"),
          "RussoOne-Regular": require("../../assets/fonts/RussoOne-Regular.ttf"),
        }),
      ]).then(() => {
        setLoadedFonts({
          regular: "AlfaSlabOne-Regular",
          medium: "RussoOne-Regular",
          bold: "AlfaSlabOne-Regular",
          heavy: "RussoOne-Regular",
        });
        setCompleted(true);
      }).catch((error) => {
        console.warn("Error loading resources:", error);
        setCompleted(true); // Still set completed to true so app can proceed
      });
    }

    loadResourcesAndDataAsync();
  }, []);

  return { completed, loadedFonts };
}
