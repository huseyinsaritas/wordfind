import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { Logo } from "../Logo/Logo";

export const FullBackground: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* <ImageBackground source={require("../../../../assets/bg.png")} resizeMode="cover" style={styles.image}> */}

      <SafeAreaView style={styles.b}>
        {/* <Logo /> */}
        <View style={styles.c}>{children}</View>
      </SafeAreaView>
      {/* </ImageBackground> */}
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
