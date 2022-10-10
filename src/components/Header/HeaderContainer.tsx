import React from "react";
import { StyleSheet, View, Platform } from "react-native";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const HeaderContainer: React.FC<Props> = ({ children }) => {
  return <View style={styles.headerContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // height: 55,
    marginTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 10,
    overflow: "hidden",
  },
});
