import React, { useEffect, useState } from "react";
import { Alert, Platform, Text } from "react-native";
import { InterstitialAd, AdEventType, TestIds } from "react-native-google-mobile-ads";
import { CONF } from "../../conf";
import { Button } from "../Base/Button/Button";
import { Loading } from "../Base/Loading";

const adUnitIdInterstitial = __DEV__ ? TestIds.INTERSTITIAL : Platform.select(CONF.ADMOB.interstitial) || "";
// const adUnitIdInterstitial = Platform.select(CONF.ADMOB.interstitial) || "";

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true,
});

export const AdInterstitial: React.FC<{ onClosed: () => void; onFailed: () => void }> = ({ onClosed, onFailed }) => {
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

    const unsubscribeClose = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      setLoaded(false);
      onClosed();
    });

    const unsubscribeFail = interstitial.addAdEventListener(AdEventType.ERROR, (ee) => {
      setErr(ee.message);
      onFailed();
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribe();
      unsubscribeClose();
      unsubscribeFail();
    };
  }, []);

  useEffect(() => {
    if (loaded) interstitial.show();
  }, [loaded]);

  if (err) return <Loading message="" />;

  // No advert ready to show yet
  if (!loaded) return <Loading message="" />;

  // return <Loading message="" />;

  return (
    <Button
      text="Show Interstitial"
      onPress={() => {
        interstitial.show();
      }}
    />
  );
};
