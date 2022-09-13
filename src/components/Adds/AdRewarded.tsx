import React, { useEffect, useState } from "react";
import { TestIds, RewardedInterstitialAd, RewardedAdEventType, AdEventType } from "react-native-google-mobile-ads";
import { Text, Button, Platform } from "react-native";
import { CONF } from "../../conf";

// const adUnitIdRewardedInterstitial = __DEV__ ? TestIds.REWARDED_INTERSTITIAL : Platform.select(CONF.ADMOB.rewardedInterstitial) || "";
const adUnitIdRewardedInterstitial = Platform.select(CONF.ADMOB.rewardedInterstitial) || "";

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitIdRewardedInterstitial, {
  requestNonPersonalizedAdsOnly: true,
});

export const AdRewarded = () => {
  const [rewardedInterstitialLoaded, setRewardedInterstitialLoaded] = useState(false);

  const loadRewardedInterstitial = () => {
    const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setRewardedInterstitialLoaded(true);
    });

    const unsubscribeEarned = rewardedInterstitial.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
      console.log(`User earned reward of ${reward.amount} ${reward.type}`);
    });

    const unsubscribeClosed = rewardedInterstitial.addAdEventListener(AdEventType.CLOSED, () => {
      setRewardedInterstitialLoaded(false);
      rewardedInterstitial.load();
    });

    rewardedInterstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeEarned();
    };
  };

  useEffect(() => {
    const unsubscribeRewardedInterstitialEvents = loadRewardedInterstitial();

    return () => {
      unsubscribeRewardedInterstitialEvents();
    };
  }, []);

  if (rewardedInterstitialLoaded) return <Button color={"white"} title="Show Rewarded Interstitial" onPress={() => rewardedInterstitial.show()} />;

  return <Text style={{ color: "white" }}>Loading Rewarded Interstitial...</Text>;
};
