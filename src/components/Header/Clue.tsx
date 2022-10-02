import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { COLORS } from "../../constants/Colors";
import { FONT_FAMILY } from "../../constants/Layout";
import { ClueButton } from "../Base/IconButtons/ClueButton";

type Props = {
  onPressClue: () => void;
};

export const Clue: React.FC<Props> = ({ onPressClue }) => {
  return (
    <View style={styles.clueContent}>
      <ClueButton style={styles.clueButton} onPress={onPressClue} color={COLORS.YELLOW} size={22} />
      <Text style={styles.clueText}>2</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  clueContent: {
    display: "flex",
    flexDirection: "row",
    minWidth: 60,
    marginTop: 5,
    backgroundColor: COLORS.BLUE_LIGHT,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  clueButton: {
    paddingRight: 5,
    paddingTop: 2,
  },
  clueText: {
    fontSize: 24,
    color: "#fff",
    fontFamily: FONT_FAMILY.Black,
    paddingRight: 5,
  },
});
