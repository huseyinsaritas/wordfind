import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  children: any;
};

export const BodyContainer: React.FC<Props> = ({ children }) => {
  return <View style={styles.bodyContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  bodyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
