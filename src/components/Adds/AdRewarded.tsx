import React, { useEffect, useState } from "react";
import { TestIds, RewardedAd, RewardedAdEventType, AdEventType } from "react-native-google-mobile-ads";
import { Platform } from "react-native";
import { CONF } from "../../conf";

const adUnitIdRewarded = __DEV__ ? TestIds.REWARDED : Platform.select(CONF.ADMOB.rewarded) || "";
// const adUnitIdRewarded = Platform.select(CONF.ADMOB.rewarded) || "";

const rewarded = RewardedAd.createForAdRequest(adUnitIdRewarded, {
  requestNonPersonalizedAdsOnly: true,
});

export const AdRewarded: React.FC<{ show: boolean; onEarned: () => void; onClosed: () => void; onFailed: (err: string) => void }> = ({ show, onEarned, onClosed, onFailed }) => {
  const [rewardedLoaded, setRewardedLoaded] = useState(false);
  const [err, setErr] = useState<string | undefined>();

  const loadRewarded = () => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setRewardedLoaded(true);
    });

    const unsubscribeEarned = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
      console.log(reward);
      onEarned();
    });

    const unsubscribeClosed = rewarded.addAdEventListener(AdEventType.CLOSED, () => {
      setRewardedLoaded(false);
      // rewarded.load();
      onClosed();
    });

    const unsubscribeFail = rewarded.addAdEventListener(AdEventType.ERROR, (err) => {
      setErr(err.message);
      onFailed(err.message);
      console.log("err", err.message);
    });

    rewarded.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeEarned();
      unsubscribeFail();
    };
  };

  useEffect(() => {
    const unsubscribeRewardedInterstitialEvents = loadRewarded();

    return () => {
      unsubscribeRewardedInterstitialEvents();
    };
  }, []);

  useEffect(() => {
    if (rewardedLoaded && show) rewarded.show();
  }, [rewardedLoaded, show]);

  if (rewardedLoaded === false) return null;
  if (rewardedLoaded && !show) return null;
  if (rewardedLoaded && show) return null;

  return null;
};
