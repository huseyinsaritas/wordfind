import React from "react";
import { StyleSheet, View } from "react-native";
import { DISCLOSE_TIME_MS } from "../../constants/Layout";
import { IChar } from "../../model/Char";
import { IGameData } from "../../model/GameData";
import { Delayed } from "../Delayed/Delayed";
import { GameOver } from "./GameOver";
import { GuessContainer } from "./GuessContainer";
import { Keyboard } from "./Keyboard";

type Props = {
  data: IGameData;
  onPressKeyboard: (char: IChar) => void;
  onPressSubmit: () => void;
  onPressCancel: () => void;
  gameFinished?: boolean;
  isValid: boolean;
  gameWon: boolean;
};

export const Body: React.FC<Props> = ({ data, onPressKeyboard, onPressSubmit, onPressCancel, gameFinished, isValid, gameWon }) => {
  console.log("gameFinished", gameFinished);

  return (
    <View style={styles.body}>
      <GuessContainer data={data} isValid={isValid} />
      <View style={styles.keyboardContent}>
        <Keyboard onPress={onPressKeyboard} onPressSubmit={onPressSubmit} onPressCancel={onPressCancel} answer={data.answer} mays={data.mays} gameFinished={gameFinished} />
      </View>
      {gameFinished && (
        <Delayed waitBeforeShow={DISCLOSE_TIME_MS * data.answer.length}>
          <GameOver data={data} gameWon={gameWon} />
        </Delayed>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    display: "flex",
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 5,
    // marginBottom: 5,
  },
  keyboardContent: {
    // marginTop: 10,
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
  },
});
