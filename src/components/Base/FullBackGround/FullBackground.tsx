import React from "react";
import { ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import { COLORS } from "../../../constants/Colors";
import { useGlobalState } from "../../../global/globalState";
import { Theme } from "../../../global/type";
import useThemedStyles from "../../../hooks/useThemedSyles";

export const FullBackground: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  const { state } = useGlobalState();
  // const style = useThemedStyles(styles);
  return (
    <View style={[styles.container, { backgroundColor: state.theme?.colors.BACKGROUND }]}>
      <ImageBackground source={require("../../../../assets/bg.png")} resizeMode="cover" style={styles.image}>
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
    // backgroundColor: COLORS.DARK.BACKGROUND,
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
