import React from "react";
import { TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Icon from "@expo/vector-icons/Feather";
import { COLORS } from "../../../constants/Colors";
import { useGlobalState } from "../../../global/globalState";

type Props = {
  onPress?: () => void;
  disabled?: boolean;
};

const BackKey: React.FC<Props> = ({ disabled, onPress }) => {
  const { state } = useGlobalState();
  return (
    <TouchableOpacity
      disabled={disabled}
      delayPressIn={0}
      delayPressOut={0}
      delayLongPress={0}
      style={[styles.backKey, { minWidth: state.lan === "en" ? Dimensions.get("window").width / 6.75 : Dimensions.get("window").width / 6 }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Icon name="delete" size={40} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backKey: {
    minWidth: Dimensions.get("window").width / 8,
    width: 20,
    height: 55,
    marginLeft: 2,
    borderRadius: 4,
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
    // position: "absolute",
    // right: 2,
    // bottom: 2,
  },
});

export default BackKey;
