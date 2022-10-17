import { useState, useEffect, useRef } from "react";
import { useTheme } from "./useTheme";

export const useShake = () => {
  const [shake, setShake] = useState(false);
  const intervalRef = useRef<NodeJS.Timer | undefined>(undefined);
  const { theme } = useTheme();
  useEffect(() => {
    if (shake === true) {
      intervalRef.current = setInterval(() => {
        setShake(false);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [shake]);

  const setShaked = (message: string) => {
    setShake(true);
    window.toastr?.show(message, {
      type: "normal",
      animationType: "zoom-in",
      placement: "top",
      animationDuration: 200,
      duration: 1500,
      normalColor: theme.colors.notification,
      style: {
        backgroundColor: theme.colors.notification,
      },
      textStyle: {
        color: theme.colors.primary,
      },
    });
  };

  return { shake, setShaked };
};
