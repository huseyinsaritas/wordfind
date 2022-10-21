import React, { createContext, useState, useContext, Dispatch, SetStateAction, useEffect, useCallback } from "react";
import Sound from "react-native-sound";
import { useStorageData } from "../hooks/useStorageData";
import { fetchInitialState } from "./fetchInitialState";
import { GlobalStateStorageKeys, GlobalStateType } from "./type";
import { playSound as playSoundHelp } from "./allSounds";

const GlobalStateContext = createContext({
  state: {} as Partial<GlobalStateType>,
  setState: {} as Dispatch<SetStateAction<Partial<GlobalStateType>>>,
  playSound: {} as (soundName: "game" | "key" | "remove" | "success" | "wrong" | "gameOver" | "gameWon" | "bonus" | "noBonus" | "click") => void,
});

const GlobalStateProvider: React.FC<{ children: React.ReactNode; value?: Partial<GlobalStateType> }> = ({ children, value = {} as GlobalStateType }) => {
  const [state, setState] = useState(value);

  useEffect(() => {
    const initState = async () => {
      const initialStateData = await fetchInitialState();
      setState(initialStateData);
    };

    initState();
  }, []);

  const playSound = useCallback(
    (soundName: "game" | "key" | "remove" | "success" | "wrong" | "gameOver" | "gameWon" | "bonus" | "noBonus" | "click") => {
      // console.log("state.soundsOn", state.soundsOn);
      if (!state.soundsOn) return;
      if (!state.allSounds) return;

      let s: Sound = state.allSounds[0];
      switch (soundName) {
        case "game":
          s = state.allSounds[0];
          break;
        case "key":
          s = state.allSounds[1];
          break;
        case "remove":
          s = state.allSounds[2];
          break;
        case "success":
          s = state.allSounds[3];
          break;
        case "wrong":
          s = state.allSounds[4];
          break;
        case "gameOver":
          s = state.allSounds[5];
          break;
        case "gameWon":
          s = state.allSounds[6];
          break;
        case "bonus":
          s = state.allSounds[7];
          break;
        case "noBonus":
          s = state.allSounds[8];
          break;
        case "click":
          s = state.allSounds[9];
          break;
        default:
          break;
      }
      playSoundHelp(s);
    },
    [state.soundsOn, state.allSounds?.length]
  );

  return <GlobalStateContext.Provider value={{ state, setState, playSound }}>{children}</GlobalStateContext.Provider>;
};

const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  const { saveStorageData } = useStorageData();
  if (!context) throw new Error("useGlobalState must be used within a GlobalStateContext");

  const setState = (value: React.SetStateAction<Partial<GlobalStateType>>) => {
    /**
     * Storage check
     */
    let newState: Partial<GlobalStateType>;
    if (typeof value === "function") {
      newState = value(context.state);
    } else {
      newState = value;
    }

    Object.keys(context.state).forEach((k, i) => {
      if (context.state[k as keyof GlobalStateType] !== newState[k as keyof GlobalStateType]) {
        if (GlobalStateStorageKeys.includes(k)) {
          const prevStorageData = context.state[k as keyof GlobalStateType];
          const newStorageData = newState[k as keyof GlobalStateType];
          // console.log("Changed data key is " + k + " from " + prevStorageData + " to " + newStorageData);
          saveStorageData(k, newStorageData);
        }
      }
    });
    /**
     * Storage check
     */

    context.setState(value);
  };

  return { state: context.state, setState, playSound: context.playSound };
};

export { GlobalStateProvider, useGlobalState };
