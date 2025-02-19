import React from "react";
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { COLORS } from "../../../utils/constants/Colors";
import { FONT_FAMILY } from "../../../utils/constants/Layout";

type Props = {
  onPress: () => void;
  text: string;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
};

export const Button: React.FC<Props> = ({ onPress, text, backgroundColor, style }) => {
  return (
    <TouchableOpacity style={[styles.submit, style, { backgroundColor }]} onPress={() => onPress()}>
      <Text style={styles.text}>{text}</Text>
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
    borderColor: COLORS.COMMON.WHITE,
    backgroundColor: COLORS.COMMON.BLACK,
    color: COLORS.COMMON.WHITE,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: COLORS.COMMON.WHITE,
    fontFamily: FONT_FAMILY.Black,
  },
});
