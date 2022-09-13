import React from "react";
import { StyleSheet, View } from "react-native";

export const HeaderContainer: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  return <View style={styles.headerContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    height: 64,
    marginTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 10,
    overflow: "hidden",
  },
});
