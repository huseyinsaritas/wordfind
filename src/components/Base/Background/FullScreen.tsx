import React from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";

type Props = {
  onLayout?: (event: LayoutChangeEvent) => void;
  children: JSX.Element | JSX.Element[];
};

export const FullScreen: React.FC<Props> = ({ onLayout, children }) => {
  return (
    <View style={styles.fullScreen} onLayout={onLayout}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    display: "flex",
  },
});
