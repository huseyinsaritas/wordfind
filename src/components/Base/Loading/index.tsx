import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../../constants/Colors";
import { FONT_FAMILY } from "../../../constants/Layout";
import { FullScreen } from "../Background/FullScreen";
import { SafeArea } from "../Background/SafeArea";

type Props = {
  message: string;
};

export const Loading: React.FC<Props> = ({ message }) => {
  return (
    <FullScreen>
      <SafeArea>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.YELLOW} />
          <Text style={styles.loading}>{message}</Text>
        </View>
      </SafeArea>
    </FullScreen>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: COLORS.LIGHTGRAY,
  },
  loading: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 24,
    fontFamily: FONT_FAMILY.Black,
    color: COLORS.COLOR_TONE2,
  },
});
