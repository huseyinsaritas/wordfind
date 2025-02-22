import React from "react";
import { Platform } from "react-native";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import { CONF } from "../../utils/conf";

const adUnitIdBanner = __DEV__ ? TestIds.ADAPTIVE_BANNER : Platform.select(CONF.ADMOB.banner) || "";

export const AdBanner: React.FC<{ size?: string }> = ({ size = BannerAdSize.LARGE_BANNER }) => {
  return (
    <BannerAd
      unitId={adUnitIdBanner}
      size={size}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      onAdFailedToLoad={(er) => {
        console.log("errr", er);
      }}
    />
  );
};
