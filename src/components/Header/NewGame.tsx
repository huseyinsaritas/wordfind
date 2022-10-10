import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/Colors";
import { FONT_FAMILY } from "../../constants/Layout";
import { useLanguage } from "../../hooks/useLanguage";

type Props = {
  onPress: () => void;
};

export const NewGame: React.FC<Props> = ({ onPress }) => {
  const { t } = useLanguage();
  return (
    <TouchableOpacity style={styles.submit} onPress={() => onPress()}>
      <Text style={styles.text}>{t("newGame")}</Text>
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
    borderColor: COLORS.COMMON.GREEN_SUPER_LIGHT,
    backgroundColor: COLORS.COMMON.COLOR_TONE3,
    color: COLORS.COMMON.COLOR_TONE1,
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
    color: COLORS.COMMON.GREEN_SUPER_LIGHT,
    fontFamily: FONT_FAMILY.Black,
  },
});
