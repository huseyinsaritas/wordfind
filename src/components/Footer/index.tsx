import React from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../../constants/Colors";
import { AdBanner } from "../Adds/AdBanner";

type Props = {
  // gameFinished: boolean;
};
export const Footer: React.FC<Props> = (
  {
    /*gameFinished */
  }
) => {
  return (
    <View style={styles.footer}>
      {/* <GameOver /> */}
      {/* <View style={styles.banner}>
        <AdBanner />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    alignItems: "center",
    backgroundColor: COLORS.WHITE,
  },
  banner: {
    zIndex: 2,
    position: "absolute",
    textAlign: "center",
    alignItems: "center",
    width: "100%",
    bottom: 0,
    /* borderWidth: 2, */
  },
});
