import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONT_FAMILY } from "../../const";

export const GameOver = () => {
  return (
    <View>
      <Text style={styles.gameOver}>Game Over</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  gameOver: {
    textAlign: "center",
    fontSize: 24,
    padding: 5,
    backgroundColor: COLORS.GREEN_SUPER_LIGHT,
    fontFamily: FONT_FAMILY.Black,
  },
});
