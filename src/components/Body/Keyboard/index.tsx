import React, { useEffect, useState } from "react";
import { IChar } from "../../../model/Char";
import { StyleSheet, View } from "react-native";
import { alphabetData } from "../../../constants/keys";
import BackKey from "./BackKey";
import EnterKey from "./EnterKey";
import { Key } from "./Key";
import { getKeyColors, isBorder } from "../../../util";
import { DISCLOSE_TIME_MS, FONT_FAMILY } from "../../../constants/Layout";
import { useGlobalState } from "../../../global/globalState";
import { IGameData } from "../../../model/GameData";

type Props = {
  onPress: (char: IChar) => void;
  onPressSubmit: () => void;
  onPressCancel: () => void;
  data: IGameData;
  gameFinished?: boolean;
  clueChars: string[];
  keysDisabled: boolean;
};

export const Keyboard: React.FC<Props> = ({ onPress, onPressSubmit, onPressCancel, data, gameFinished, clueChars, keysDisabled }) => {
  const { state } = useGlobalState();

  const alphabet = state.lan === "en" ? alphabetData.EN : alphabetData.TR;
  const lines = [0, 1, 2].map((i) => alphabet.filter((k) => k.l === i));
  const colors = getKeyColors(data.answer, data.mays);
  const border = isBorder(clueChars);

  return (
    <View style={styles.keyboard}>
      <View style={styles.keys}>
        {lines.map((line, index) => {
          return (
            <View key={index} style={styles.line}>
              {line.map((key, i) => {
                return (
                  <Key
                    key={i + 1}
                    val={key.c}
                    onPress={() => {
                      onPress(key);
                    }}
                    color={colors[key.c]}
                    isBorder={border[key.c]}
                    disabled={keysDisabled || gameFinished}
                    answer={data.answer}
                  />
                );
              })}
            </View>
          );
        })}
      </View>
      <EnterKey onPress={onPressSubmit} disabled={keysDisabled || gameFinished} />
      <BackKey onPress={onPressCancel} disabled={keysDisabled || gameFinished} />
    </View>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    alignContent: "center",
    justifyContent: "center",
  },
  keys: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  line: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  font: {
    fontSize: 24,
    includeFontPadding: false,
    color: "#fff",
    fontFamily: FONT_FAMILY.Black,
  },
});
