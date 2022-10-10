import React from "react";
import { StyleSheet, View } from "react-native";
import { IChar } from "../../model/Char";
import { IGameData } from "../../model/GameData";
import { AdInterstitial } from "../Adds/AdInterstitial";
import { AdRewardedInterstitial } from "../Adds/AdRewardedInterstitial";
import { GuessContainer } from "./GuessContainer";
import { Keyboard } from "./Keyboard";

type Props = {
  data: IGameData;
  onPressKeyboard: (char: IChar) => void;
  onPressSubmit: () => void;
  onPressCancel: () => void;
  gameFinished?: boolean;
  isValid: boolean;
  clueChars: string[];
  gameWon: boolean;
  keysDisabled: boolean;
};

export const Body: React.FC<Props> = ({ data, onPressKeyboard, onPressSubmit, onPressCancel, gameFinished, isValid, clueChars, gameWon, keysDisabled }) => {
  return (
    <View style={styles.body}>
      <GuessContainer data={data} isValid={isValid} />
      <View style={styles.keyboardContent}>
        <Keyboard
          onPress={onPressKeyboard}
          onPressSubmit={onPressSubmit}
          onPressCancel={onPressCancel}
          data={data}
          gameFinished={gameFinished}
          clueChars={clueChars}
          keysDisabled={keysDisabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    display: "flex",
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 5,
  },
  keyboardContent: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
  },
});
