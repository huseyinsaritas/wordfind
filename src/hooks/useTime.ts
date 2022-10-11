import { useState, useRef } from "react";

export const useTime = () => {
  const [timer, setTimer] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timer | undefined>(undefined);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
  };

  const resetTime = () => {
    pauseTimer();
    setTimer(0);
  };

  return { timer, startTimer, pauseTimer, resetTime };
};
