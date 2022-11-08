import React from "react";
import { TouchableOpacity, StyleSheet, View, Text, Dimensions } from "react-native";
import { COLORS } from "../../../constants/Colors";
import { FONT_FAMILY } from "../../../constants/Layout";
import { useGlobalState } from "../../../global/globalState";

type Props = {
  onPress?: () => void;
  disabled?: boolean;
};

const EnterKey: React.FC<Props> = ({ disabled, onPress }) => {
  const { state } = useGlobalState();
  return (
    <TouchableOpacity
      disabled={disabled}
      delayPressIn={0}
      delayPressOut={0}
      delayLongPress={0}
      style={[styles.enterKey, { minWidth: state.lan === "en" ? Dimensions.get("window").width / 6.75 : Dimensions.get("window").width / 7.75 }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.buttonKeyCenter}>
        <Text style={styles.font}>ENTER</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  enterKey: {
    minWidth: Dimensions.get("window").width / 8,
    height: 55,
    marginVertical: 1,
    borderRadius: 4,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.COMMON.GRAY,
    color: COLORS.COMMON.COLOR_TONE1,
    borderColor: COLORS.COMMON.DARKGRAY,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    position: "absolute",
    left: 2,
    bottom: 2,
  },
  buttonKeyCenter: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: 2,
  },
  font: {
    fontSize: 10,
    includeFontPadding: false,
    color: "#fff",
    fontFamily: FONT_FAMILY.Black,
  },
});

export default EnterKey;
