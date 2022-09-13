import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { COLORS, FONT_FAMILY } from "../../const";
import { InfoButton } from "./InfoButton";

export const Score: React.FC<{ totalScore: number }> = ({ totalScore }) => {
  return (
    <View style={styles.score}>
      <View style={styles.scoreHeader}>
        <Text style={styles.scoreText}>SCORE</Text>
        <View style={styles.scoreValueArea}>
          <View style={styles.scoreValueArea2}>
            <Text style={styles.scoreValue}>{totalScore}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  score: {
    width: "100%",
    position: "relative",
    height: "100%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
  },
  scoreHeader: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  scoreText: {
    alignContent: "center",
    textAlign: "center",
    fontFamily: FONT_FAMILY.Black,
    color: COLORS.GREEN_SUPER_LIGHT,
    marginRight: 5,
    fontSize: 22,
  },
  scoreValueArea: {
    marginTop: 0,
    padding: 0,
    overflow: "hidden",
  },
  scoreValueArea2: {
    height: 22,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  scoreValue: {
    fontSize: 30,
    lineHeight: 30,
    includeFontPadding: false,
    textAlign: "center",
    fontFamily: FONT_FAMILY.Black,
    color: COLORS.ORANGE,
  },
});
