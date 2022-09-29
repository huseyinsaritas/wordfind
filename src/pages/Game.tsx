import React from "react";
import { Background } from "../components/Background";
import { Header } from "../components/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootScreenParamList } from "../types";
import { IChar } from "../model/Char";
import { Loading } from "../components/Loading";
import { Body } from "../components/Body";
import { Alert } from "../components/Alert/Alert";
import { useGame } from "../hooks/useGame";
import { Footer } from "../components/Footer";

export const GamePage: React.FC<NativeStackScreenProps<RootScreenParamList, "Game">> = ({ navigation, route }) => {
  const { length } = route.params;
  const { gameLoading, gameFinished, data, alertMessage, onCloseAlert, addCurrentMay, removeCurrentMay, submitData, newGame, isValid, gameWon } = useGame(length);

  const onPressGoBack = () => {
    navigation.navigate("Home");
  };

  const onPressInfo = () => {
    navigation.navigate("Info");
  };

  const onPressNewGame = () => {
    newGame();
  };

  const onPressSubmit = () => {
    submitData();
  };

  const onPressCancel = () => {
    removeCurrentMay();
  };

  const onPressKeyboard = (char: IChar) => {
    addCurrentMay(char);
  };

  if (gameLoading || data === undefined) return <Loading message="Oyun Yukleniyor.." />;

  return (
    <>
      {alertMessage.show && <Alert alertMessage={alertMessage} onClose={onCloseAlert} closeMs={1000} />}
      <Background>
        <Header onPressGoBack={onPressGoBack} onPressInfo={onPressInfo} onPressNewGame={onPressNewGame} />
        <Body
          data={data}
          onPressKeyboard={onPressKeyboard}
          onPressSubmit={onPressSubmit}
          onPressCancel={onPressCancel}
          gameFinished={gameFinished}
          isValid={isValid}
          gameWon={gameWon}
        />
        <Footer />
      </Background>
    </>
  );
};
