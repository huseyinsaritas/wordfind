import React, { useEffect, useState } from "react";
import { RootScreenParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Loading } from "../components/Base/Loading";
import { IGameData } from "../model/GameData";
import { getInitialData } from "../data/getInitialData";
import { useGlobalState } from "../global/globalState";
import { AdInterstitial } from "../components/Adds/AdInterstitial";
import { useTime } from "../hooks/useTime";

export const GamePreScreen: React.FC<NativeStackScreenProps<RootScreenParamList, "GamePre">> = ({ navigation, route }) => {
  const { length } = route.params;
  const { state } = useGlobalState();
  const [gameData, setGameData] = useState<IGameData>();
  const [showAd, setShowAd] = useState<boolean>((state.gameCount ?? 1) % (state.adsCycle ?? 3) === 0);

  useEffect(() => {
    getInitialData(length, state.lan).then((gd) => {
      setGameData(gd);
    });
  }, []);

  useEffect(() => {
    if (gameData && showAd === false) navigation.replace("Game", { length });
  }, [gameData, showAd]);

  const adPassed = () => {
    setShowAd(false);
  };

  return <>{showAd ? <AdInterstitial onClosed={adPassed} onFailed={adPassed} /> : <Loading message="" />}</>;
};
