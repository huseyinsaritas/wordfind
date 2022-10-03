import React from "react";
import { StyleSheet, SafeAreaView, View, Platform, StatusBar } from "react-native";

export const SafeArea: React.FC<{ bgColor: string; children: JSX.Element | JSX.Element[] }> = ({ bgColor, children }) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={{ ...styles.view, backgroundColor: bgColor }}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    display: "flex",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  view: {
    flex: 1,
    display: "flex",
  },
});
