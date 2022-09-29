import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/Feather";
import { COLORS } from "../../../constants/Colors";

type Props = {
  onPress?: () => void;
  gameFinished?: boolean;
};

const BackKey: React.FC<Props> = ({ gameFinished, onPress }) => {
  return (
    <TouchableOpacity disabled={gameFinished} style={styles.backKey} onPress={onPress} activeOpacity={0.8}>
      <Icon name="delete" size={32} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backKey: {
    minWidth: 48,
    height: 55,
    marginVertical: 1,
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.COLOR_TONE2,
    color: COLORS.COLOR_TONE1,
    borderColor: COLORS.COLOR_TONE4,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    position: "absolute",
    right: 2,
    bottom: 2,
  },
});

export default BackKey;
