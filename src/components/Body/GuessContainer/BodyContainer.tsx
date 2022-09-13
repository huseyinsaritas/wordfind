import React from "react";
import { StyleSheet, View } from "react-native";

export const BodyContainer: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  return <View style={styles.bodyContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  bodyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
