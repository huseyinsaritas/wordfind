import React from "react";
import { Background } from "../components/Base/Background";
import { Header } from "../components/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootScreenParamList } from "../types";
import { IChar } from "../model/Char";
import { Loading } from "../components/Base/Loading";
import { Body } from "../components/Body";
import { Alert } from "react-native";
import { AlertModal } from "../components/Base/AlertModal/AlertModal";
import { useGame } from "../hooks/useGame";
import { Footer } from "../components/Footer";
import { DISCLOSE_TIME_MS } from "../constants/Layout";
import { GameOver } from "../components/Body/GameOver";
import { Delayed } from "../components/Base/Delayed/Delayed";

export const GamePage: React.FC<NativeStackScreenProps<RootScreenParamList, "Game">> = ({ navigation, route }) => {
  const { length } = route.params;
  const { gameLoading, gameFinished, data, alertMessage, onCloseAlert, addCurrentMay, removeCurrentMay, submitData, newGame, isValid, gameWon } = useGame(length);

  const onPressGoBack = () => {
    if (gameFinished) navigation.replace("Home");
    else
      Alert.alert("Emin misiniz?", "İşte gidiyorsun.", [
        { text: "Vazgeç", style: "cancel", onPress: () => {} },
        { text: "Evet", style: "destructive", onPress: () => navigation.replace("Home") },
      ]);
  };

  const onPressStatistics = () => {
    navigation.navigate("Info");
  };

  const onPressHomePage = () => {
    navigation.navigate("Home");
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
      {alertMessage.show && <AlertModal alertMessage={alertMessage} onClose={onCloseAlert} closeMs={1000} />}
      <Background>
        <Header onPressGoBack={onPressGoBack} onPressStatistics={onPressStatistics} onPressNewGame={onPressNewGame} />
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
      {gameFinished && (
        <Delayed waitBeforeShow={DISCLOSE_TIME_MS * data.answer.length}>
          <GameOver data={data} gameWon={gameWon} onPressNewGame={onPressNewGame} onPressHomePage={onPressHomePage} />
        </Delayed>
      )}
    </>
  );
};
