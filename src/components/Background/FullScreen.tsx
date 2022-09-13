import React from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";

export const FullScreen: React.FC<{ onLayout?: (event: LayoutChangeEvent) => void; children: JSX.Element | JSX.Element[] }> = ({ onLayout, children }) => {
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
