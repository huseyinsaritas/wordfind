import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Loading } from "../components/Base/Loading";
import { IGameData } from "../utils/model/GameData";
import { getInitialData } from "../utils/data/getInitialData";
import { useGlobalState } from "../context/globalState";
import { AdInterstitial } from "../components/Adds/AdInterstitial";

export default function GamePreScreen() {
  const router = useRouter();
  const { length } = useLocalSearchParams(); 
  const { state } = useGlobalState();
  const [gameData, setGameData] = useState<IGameData>();
  const [showAd, setShowAd] = useState<boolean>((state.gameCount ?? 1) % (state.gameConf?.adsCycle ?? 3) === 0);

  useEffect(() => {
    getInitialData(Number(length), state.lan).then((gd) => {
      setGameData(gd);
    });
  }, []);

  useEffect(() => {
    if (gameData && !showAd) {
      router.replace({ pathname: "/game", params: { length } }); 
    }
  }, [gameData, showAd]);

  const adPassed = () => {
    setShowAd(false);
  };

  return <>{showAd ? <AdInterstitial onClosed={adPassed} onFailed={adPassed} /> : <Loading message="" />}</>;
}
