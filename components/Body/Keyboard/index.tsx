import React from "react";
import { IChar } from "../../../utils/model/Char";
import { StyleSheet, View } from "react-native";
import { alphabetData } from "../../../utils/constants/keys";
import BackKey from "./BackKey";
import { Key } from "./Key";
import { isBorder } from "../../../utils";
import { FONT_FAMILY } from "../../../utils/constants/Layout";
import { useGlobalState } from "../../../context/globalState";
import { IGameData, MayRow, MayRowChar } from "../../../utils/model/GameData";
import SubmitButton from "./SubmitButton";

type Props = {
  onPress: (char: IChar) => void;
  onPressSubmit: () => void;
  onPressCancel: () => void;
  onLongPressCancel: () => void;
  data: IGameData;
  gameFinished?: boolean;
  clueChars: string[];
  keysDisabled: boolean;
};

export const Keyboard: React.FC<Props> = ({ onPress, onPressSubmit, onPressCancel, onLongPressCancel, data, gameFinished, clueChars, keysDisabled }) => {
  const { state } = useGlobalState();

  const alphabet = state.lan === "en" ? alphabetData.EN : alphabetData.TR;
  const lines = [0, 1, 2].map((i) => alphabet.filter((k) => k.l === i));
  const border = isBorder(clueChars);

  //helper
  const uniqueMayRowChar: MayRowChar[] = [];
  data.mays.forEach((mr: MayRow, i) => {
    mr.chars.forEach((x: MayRowChar, j) => {
      if (x.state === 2) {
        if (!uniqueMayRowChar.some((y) => y.char === x.char)) uniqueMayRowChar.push(x);
      }
    });
  });
  data.mays.forEach((mr: MayRow, i) => {
    mr.chars.forEach((x: MayRowChar, j) => {
      if (x.state === 1) {
        if (!uniqueMayRowChar.some((y) => y.char === x.char)) uniqueMayRowChar.push(x);
      }
    });
  });
  data.mays.forEach((mr: MayRow, i) => {
    mr.chars.forEach((x: MayRowChar, j) => {
      if (x.state === 0) {
        if (!uniqueMayRowChar.some((y) => y.char === x.char)) uniqueMayRowChar.push(x);
      }
    });
  });

  return (
    <View>
      <View style={styles.keyboard}>
        <View style={styles.keys}>
          <View style={styles.line}>
            {lines[0].map((key, i) => {
              const s = uniqueMayRowChar.find((x) => x.char === key.c)?.state;
              const color = s === 2 ? "green" : s === 1 ? "yellow" : s === 0 ? "darkgray" : "gray";
              return (
                <Key
                  key={i + 1}
                  val={key}
                  onPress={() => {
                    onPress(key);
                  }}
                  color={color}
                  isBorder={border[key.c]}
                  disabled={keysDisabled || gameFinished}
                  answer={data.answer}
                />
              );
            })}
          </View>
          <View style={styles.line}>
            {lines[1].map((key, i) => {
              const s = uniqueMayRowChar.find((x) => x.char === key.c)?.state;
              const color = s === 2 ? "green" : s === 1 ? "yellow" : s === 0 ? "darkgray" : "gray";
              return (
                <Key
                  key={i + 1}
                  val={key}
                  onPress={() => {
                    onPress(key);
                  }}
                  color={color}
                  isBorder={border[key.c]}
                  disabled={keysDisabled || gameFinished}
                  answer={data.answer}
                />
              );
            })}
          </View>
          <View style={styles.line}>
            {lines[2].map((key, i) => {
              const s = uniqueMayRowChar.find((x) => x.char === key.c)?.state;
              const color = s === 2 ? "green" : s === 1 ? "yellow" : s === 0 ? "darkgray" : "gray";
              return (
                <Key
                  key={i + 1}
                  val={key}
                  onPress={() => {
                    onPress(key);
                  }}
                  color={color}
                  isBorder={border[key.c]}
                  disabled={keysDisabled || gameFinished}
                  answer={data.answer}
                />
              );
            })}
            <BackKey onPress={onPressCancel} onLongPress={onLongPressCancel} disabled={keysDisabled || gameFinished} />
          </View>
        </View>
      </View>
      <View style={styles.submitButton}>
        <SubmitButton onPress={onPressSubmit} disabled={keysDisabled || gameFinished} />
      </View>
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
  submitButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
