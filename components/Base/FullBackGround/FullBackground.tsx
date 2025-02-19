import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useTheme } from "../../../hooks/useTheme";

export const FullBackground: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <SafeAreaView style={styles.b}>
        <View style={styles.c}>{children}</View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
