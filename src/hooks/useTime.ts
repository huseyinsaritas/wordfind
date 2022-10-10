import { useState, useEffect, useRef } from "react";

export const useTime = () => {
  const [timer, setTimer] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timer | undefined>(undefined);

  // useEffect(() => {
  //   intervalRef.current = setInterval(() => {
  //     setTimer((t) => t + 1);
  //   }, 1000);

  //   return () => clearInterval(intervalRef.current);
  // }, []);

  // Add a listener to `timeLeft`
  // useEffect(() => {
  //   if (time <= 0) {
  //     clearInterval(intervalRef.current);
  //   }
  // }, [time]);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
  };

  const resumeTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
  };

  const resetTimeLeft = () => {
    pauseTimer();
    setTimer(0);
    resumeTimer();
  };

  return { timer, startTimer, pauseTimer, resumeTimer, resetTimeLeft };
};
