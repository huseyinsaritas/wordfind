import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { COLORS } from "../../../constants/Colors";
import { FONT_FAMILY } from "../../../constants/Layout";

type Props = {
  onPress?: () => void;
  gameFinished?: boolean;
};

const EnterKey: React.FC<Props> = ({ gameFinished, onPress }) => {
  return (
    <TouchableOpacity disabled={gameFinished} style={styles.enterKey} onPress={onPress}>
      <View style={styles.buttonKeyCenter}>
        <Text style={styles.font}>ENTER</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  enterKey: {
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
