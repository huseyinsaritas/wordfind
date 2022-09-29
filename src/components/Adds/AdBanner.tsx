import React from "react";
import { Platform } from "react-native";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import { CONF } from "../../conf";

const adUnitIdBanner = __DEV__ ? TestIds.BANNER : Platform.select(CONF.ADMOB.banner) || "";
// const adUnitIdBanner = Platform.select(CONF.ADMOB.banner) || "";

export const AdBanner = () => {
  return (
    <BannerAd
      unitId={TestIds.BANNER}
      // size={BannerAdSize.FULL_BANNER}
      size={BannerAdSize.LARGE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      onAdFailedToLoad={(er) => {
        console.log("errr", er);
      }}
    />
  );
};
