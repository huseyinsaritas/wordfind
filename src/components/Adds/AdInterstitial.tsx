import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { InterstitialAd, AdEventType, TestIds } from "react-native-google-mobile-ads";
import { CONF } from "../../conf";

// const adUnitIdInterstitial = __DEV__ ? TestIds.INTERSTITIAL : Platform.select(CONF.ADMOB.interstitial) || "";
const adUnitIdInterstitial = Platform.select(CONF.ADMOB.interstitial) || "";

const interstitial = InterstitialAd.createForAdRequest(adUnitIdInterstitial, {
  requestNonPersonalizedAdsOnly: true,
});

export const AdInterstitial = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

    const unsubscribeClose = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      setLoaded(false);
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribe();
      // unsubscribeClose();
    };
  }, []);

  useEffect(() => {
    if (loaded) interstitial.show();
  }, [loaded]);

  // console.log("llllllloaded", loaded);

  // No advert ready to show yet
  if (!loaded) return null;

  return <></>;

  /* return (
    <Button
      title="Show Interstitial"
      onPress={() => {
        interstitial.show();
      }}
    />
  ); */
};
