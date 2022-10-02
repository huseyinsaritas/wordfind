import React from "react";
import { StyleSheet, View } from "react-native";

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
    alignItems: "center",
    marginTop: 15,
    paddingBottom: 8,
    paddingLeft: 5,
    paddingRight: 5,
    width: "100%",
    overflow: "hidden",
  },
});
