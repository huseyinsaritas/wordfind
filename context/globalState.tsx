import React, { createContext, useState, useContext, Dispatch, SetStateAction, useEffect } from "react";
import { useStorageData } from "../hooks/useStorageData";
import { fetchInitialState } from "./fetchInitialState";
import { GlobalStateStorageKeys, GlobalStateType } from "./type";
import TrackPlayer from "react-native-track-player";
import { Asset } from "expo-asset";

// ✅ **Ses dosyalarının yolları**
const SOUND_FILES = {
  game: require("../assets/music/game.wav"),
  key: require("../assets/music/key.wav"),
  remove: require("../assets/music/remove.wav"),
  success: require("../assets/music/enter.wav"),
  wrong: require("../assets/music/wrong.wav"),
  gameOver: require("../assets/music/game-over.wav"),
  gameWon: require("../assets/music/game-won.wav"),
  bonus: require("../assets/music/bonus.wav"),
  noBonus: require("../assets/music/nobonus.wav"),
  click: require("../assets/music/click.wav"),
};

// ✅ **Önceden yüklenmiş sesler için URI'leri saklıyoruz**
let preloadedSounds: { [key: string]: string } = {};

// ✅ **Sesleri Expo Cache'e Kaydetme**
const preloadSounds = async () => {
  for (const [key, file] of Object.entries(SOUND_FILES)) {
    try {
      const asset = Asset.fromModule(file);
      await asset.downloadAsync(); // Asset önceden yükleniyor
      preloadedSounds[key] = asset.localUri ?? "";
    } catch (error) {
      console.error(`❌ ${key} önceden yüklenemedi:`, error);
    }
  }
};

// ✅ **Global State Tanımı**
const GlobalStateContext = createContext({
  state: {} as Partial<GlobalStateType>,
  setState: {} as Dispatch<SetStateAction<Partial<GlobalStateType>>>,
  playSound: {} as (soundName: keyof typeof SOUND_FILES) => void,
});

// ✅ **Ses Çalma Fonksiyonu**
const playSound = async (soundName: keyof typeof SOUND_FILES, soundsOn: number) => {
  try {
    if (soundsOn === 0) return;
    if (!preloadedSounds[soundName]) return;

    // Reset without awaiting
    TrackPlayer.reset().catch(console.warn);

    // Add and play without awaiting
    TrackPlayer.add({
      id: soundName,
      url: preloadedSounds[soundName],
      title: soundName,
      artist: "System",
    })
      .then(() => {
        TrackPlayer.play().catch(console.warn);
      })
      .catch(console.warn);
  } catch (error) {
    console.error(`❌ Hata "${soundName}" çalınırken:`, error);
  }
};

// ✅ **GlobalStateProvider Bileşeni**
const GlobalStateProvider: React.FC<{ children: React.ReactNode; value?: Partial<GlobalStateType> }> = ({ children, value = {} as GlobalStateType }) => {
  const [state, setState] = useState(value);
  const { saveStorageData } = useStorageData();

  useEffect(() => {
    let mounted = true;

    const initState = async () => {
      try {
        // Load initial state and preload sounds
        const initialStateData = await fetchInitialState();
        if (mounted) {
          setState(initialStateData);
        }
        await preloadSounds();
      } catch (error) {
        console.error("❌ Error initializing global state:", error);
      }
    };

    initState();

    return () => {
      mounted = false;
    };
  }, []);

  // 🔥 **State Değişikliklerini Kaydet**
  const updateState = (value: React.SetStateAction<Partial<GlobalStateType>>) => {
    let newState: Partial<GlobalStateType> = typeof value === "function" ? value(state) : value;

    Object.keys(state).forEach((key) => {
      if (state[key as keyof GlobalStateType] !== newState[key as keyof GlobalStateType]) {
        if (GlobalStateStorageKeys.includes(key)) {
          saveStorageData(key, newState[key as keyof GlobalStateType]);
        }
      }
    });

    setState(newState);
  };

  return (
    <GlobalStateContext.Provider value={{ state, setState: updateState, playSound: (soundName) => playSound(soundName, state.soundsOn ?? 0) }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// ✅ **useGlobalState Hook'u**
const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) throw new Error("useGlobalState must be used within a GlobalStateContext");

  return { state: context.state, setState: context.setState, playSound: context.playSound };
};

export { GlobalStateProvider, useGlobalState };
