import React from "react";
import { ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import { COLORS } from "../../../constants/Colors";

export const FullBackground: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require("../../../../assets/splash.png")} resizeMode="cover" style={styles.image}>
        <SafeAreaView style={styles.b}>
          <View style={styles.c}>{children}</View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.COLOR_TONE7,
  },
  image: {
    flex: 1,
  },
  b: {
    flex: 1,
  },
  c: {
    flex: 1,
  },
});
