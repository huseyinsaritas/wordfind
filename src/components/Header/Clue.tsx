import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/Colors";
import { FONT_FAMILY } from "../../constants/Layout";
import Icon from "@expo/vector-icons/Ionicons";

type Props = {
  remainingClue: number;
  onPressClue: () => void;
  gameFinished: boolean;
};

export const Clue: React.FC<Props> = ({ onPressClue, remainingClue, gameFinished }) => {
  return (
    <TouchableOpacity disabled={gameFinished} onPress={onPressClue}>
      <View style={styles.clueContent}>
        <Icon style={styles.clueButton} name="ios-bulb" size={22} color={remainingClue === 0 ? COLORS.COMMON.BLACK : COLORS.COMMON.YELLOW} />
        <Text style={styles.clueText}>{remainingClue}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  clueContent: {
    display: "flex",
    flexDirection: "row",
    minWidth: 60,
    marginTop: 5,
    backgroundColor: COLORS.COMMON.DARKGRAY,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 10,
    // height: 35,
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
