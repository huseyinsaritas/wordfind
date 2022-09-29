import React from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../../../constants/Colors";
import { alphabetData } from "../../../constants/keys";
import { FONT_FAMILY } from "../../../constants/Layout";
import { IChar } from "../../../model/Char";
import { getKeyColors } from "../../../util";
import BackKey from "./BackKey";
import EnterKey from "./EnterKey";
import { Key } from "./Key";

type Props = {
  onPress: (char: IChar) => void;
  onPressSubmit: () => void;
  onPressCancel: () => void;
  answer: string[];
  mays: string[][];
  gameFinished?: boolean;
};

export const Keyboard: React.FC<Props> = ({ onPress, onPressSubmit, onPressCancel, answer, mays, gameFinished }) => {
  const lines = [0, 1, 2].map((i) => alphabetData.filter((k) => k.l === i));
  const colors = getKeyColors(answer, mays);

  return (
    <View style={styles.keyboard}>
      {lines.map((line, index) => {
        return (
          <View key={index} style={styles.line}>
            {line.map((key, i) => {
              return (
                <View key={i}>
                  <Key
                    val={key.c}
                    onPress={() => {
                      onPress(key);
                    }}
                    color={colors[key.c]}
                    gameFinished={gameFinished}
                  />
                </View>
              );
            })}
          </View>
        );
      })}
      <BackKey onPress={onPressCancel} gameFinished={gameFinished} />
      <EnterKey onPress={onPressSubmit} gameFinished={gameFinished} />
    </View>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  line: {
    display: "flex",
    flexDirection: "row",
  },
  buttonKey: {
    minWidth: 29,
    height: 50,
    padding: 3,
    marginHorizontal: 1,
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
  },
  buttonKeyCenter: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  font: {
    fontSize: 24,
    includeFontPadding: false,
    color: "#fff",
    fontFamily: FONT_FAMILY.Black,
  },
});
