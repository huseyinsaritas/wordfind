import React from "react";
import { StyleSheet, SafeAreaView, View, Platform, StatusBar } from "react-native";
import { COLORS } from "../../constants/Colors";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const SafeArea: React.FC<Props> = ({ children }) => {
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
    backgroundColor: COLORS.COLOR_TONE7,
  },
});
