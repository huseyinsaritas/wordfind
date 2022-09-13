import React from "react";
import { StyleSheet, SafeAreaView, View, Platform, StatusBar } from "react-native";
import { COLORS } from "../../const";

export const SafeArea: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.view}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    display: "flex",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: COLORS.WHITE,
  },
  view: {
    flex: 1,
    display: "flex",
    backgroundColor: COLORS.FULL_BACKGOUND,
  },
});
