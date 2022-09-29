import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/Colors";
import { FONT_FAMILY } from "../../constants/Layout";

type Props = {
  onPress: () => void;
};

export const NewGame: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.submit} onPress={() => onPress()}>
      <Text style={styles.text}>YENi OYUN</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submit: {
    height: 40,
    paddingHorizontal: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.GREEN_SUPER_LIGHT,
    backgroundColor: COLORS.COLOR_TONE3,
    color: COLORS.COLOR_TONE1,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: COLORS.GREEN_SUPER_LIGHT,
    fontFamily: FONT_FAMILY.Black,
  },
});
