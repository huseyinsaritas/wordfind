import React, { createContext, useState, useContext, Dispatch, SetStateAction, useEffect } from "react";
import { useStorageData } from "../hooks/useStorageData";
import { fetchInitialState } from "./fetchInitialState";
import { GlobalStateStorageKeys, GlobalStateType } from "./type";

const GlobalStateContext = createContext({
  state: {} as Partial<GlobalStateType>,
  setState: {} as Dispatch<SetStateAction<Partial<GlobalStateType>>>,
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

  return <GlobalStateContext.Provider value={{ state, setState }}>{children}</GlobalStateContext.Provider>;
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

  return { state: context.state, setState };
};

export { GlobalStateProvider, useGlobalState };
