import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../../utils/constants/Colors";
import { Background } from "../Background";

export const Loading: React.FC<{ message: string }> = ({ message }) => {
  return (
    <Background>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.COMMON.WHITE} />
        <Text style={styles.loading}>{message}</Text>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: COLORS.COMMON.DARKGRAY,
  },
  loading: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 24,
    color: COLORS.COMMON.WHITE,
  },
});
