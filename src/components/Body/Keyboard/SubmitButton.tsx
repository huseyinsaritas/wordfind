import React from "react";
import { TouchableOpacity, StyleSheet, View, Text, Dimensions } from "react-native";
import { COLORS } from "../../../constants/Colors";
import { FONT_FAMILY } from "../../../constants/Layout";
import { useLanguage } from "../../../hooks/useLanguage";

type Props = {
  onPress?: () => void;
  disabled?: boolean;
};

const SubmitButton: React.FC<Props> = ({ disabled, onPress }) => {
  const { t } = useLanguage();
  return (
    <TouchableOpacity disabled={disabled} delayPressIn={0} delayPressOut={0} delayLongPress={0} style={styles.enterKey} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.buttonKeyCenter}>
        <Text style={styles.font}>{t("submit")}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  enterKey: {
    minWidth: Dimensions.get("window").width / 8,
    width: "50%",
    height: 55,
    marginVertical: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.COMMON.COLOR_TONE2,
    color: COLORS.COMMON.COLOR_TONE1,
    borderColor: COLORS.COMMON.COLOR_TONE4,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    marginTop: 5,
  },
  buttonKeyCenter: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: 2,
  },
  font: {
    fontSize: 18,
    includeFontPadding: false,
    color: "#fff",
    fontFamily: FONT_FAMILY.Black,
  },
});

export default SubmitButton;
