import React, { useEffect, useState } from "react";
import { TestIds, RewardedInterstitialAd, RewardedAdEventType, AdEventType } from "react-native-google-mobile-ads";
import { Platform } from "react-native";
import { CONF } from "../../conf";

const adUnitIdRewardedInterstitial = __DEV__ ? TestIds.REWARDED_INTERSTITIAL : Platform.select(CONF.ADMOB.rewardedInterstitial) || "";
// const adUnitIdRewardedInterstitial = Platform.select(CONF.ADMOB.rewardedInterstitial) || "";

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitIdRewardedInterstitial, {
  requestNonPersonalizedAdsOnly: true,
});

export const AdRewardedInterstitial: React.FC<{ show: boolean; onEarned: () => void; onClosed: () => void; onFailed: () => void }> = ({ show, onEarned, onClosed, onFailed }) => {
  const [rewardedInterstitialLoaded, setRewardedInterstitialLoaded] = useState(false);
  const [err, setErr] = useState("");

  const loadRewardedInterstitial = () => {
    const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setRewardedInterstitialLoaded(true);
    });

    const unsubscribeEarned = rewardedInterstitial.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
      onEarned();
    });

    const unsubscribeClosed = rewardedInterstitial.addAdEventListener(AdEventType.CLOSED, () => {
      setRewardedInterstitialLoaded(false);
      onClosed();
      // rewardedInterstitial.load();
    });

    const unsubscribeFail = rewardedInterstitial.addAdEventListener(AdEventType.ERROR, (err) => {
      setErr(err.message);
      onFailed();
      console.log("err", err.message);
    });

    rewardedInterstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeEarned();
      unsubscribeFail();
    };
  };

  useEffect(() => {
    const unsubscribeRewardedInterstitialEvents = loadRewardedInterstitial();

    return () => {
      unsubscribeRewardedInterstitialEvents();
    };
  }, []);

  /* if (rewardedInterstitialLoaded) return <Button color={"white"} title="Show Rewarded Interstitial" onPress={() => rewardedInterstitial.show()} />;
  return <Text style={{ color: "white" }}>Loading Rewarded Interstitial...</Text>; */

  useEffect(() => {
    if (rewardedInterstitialLoaded && show) rewardedInterstitial.show();
  }, [rewardedInterstitialLoaded, show]);

  // if (!rewardedInterstitialLoaded) return <Loading message={"Reklam Yükleniyor"} />;
  if (rewardedInterstitialLoaded === false) return null;
  if (rewardedInterstitialLoaded && !show) return null;
  if (rewardedInterstitialLoaded && show) return null;

  return null;
};
