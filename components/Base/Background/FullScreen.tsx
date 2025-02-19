import React from "react";
import { StyleSheet, View } from "react-native";

export const FullScreen: React.FC<{ bgColor?: string; topColor?: string; bottomColor?: string; children: JSX.Element | JSX.Element[] }> = ({
  bgColor,
  topColor,
  bottomColor,
  children,
}) => {
  const tb = { backgroundColor: topColor ?? bgColor };
  const bb = { backgroundColor: bottomColor ?? bgColor };

  return (
    <View style={styles.fullScreen}>
      <View style={{ ...styles.fullTop, ...tb }} />
      <View style={{ ...styles.fullBottom, ...bb }} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    display: "flex",
  },
  fullTop: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "50%",
  },
  fullBottom: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "50%",
  },
});
