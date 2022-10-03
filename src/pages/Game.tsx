import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootScreenParamList } from "../types";
import { IChar } from "../model/Char";
import { Loading } from "../components/Base/Loading";
import { Body } from "../components/Body";
import { Alert } from "react-native";
import { useGame } from "../hooks/useGame";
import { Footer } from "../components/Footer";
import { DISCLOSE_TIME_MS } from "../constants/Layout";
import { GameOver } from "../components/Body/GameOver";
import { Delayed } from "../components/Base/Delayed/Delayed";
import { COLORS } from "../constants/Colors";
import { Background } from "../components/Base/Background";
import { AdsModal } from "../components/AdsModal/AdsModal";
import { getRandomClueChar } from "../util";
import { BackHandler } from "react-native";

export const GamePage: React.FC<NativeStackScreenProps<RootScreenParamList, "Game">> = ({ navigation, route }) => {
  const { length } = route.params;
  const { gameLoading, gameFinished, data, addCurrentMay, removeCurrentMay, submitData, newGame, isValid, gameWon } = useGame(length);
  const [clue, setClue] = useState<{ showAdd: boolean; remaining: number }>({ showAdd: false, remaining: 3 });
  const [clueChars, setClueChars] = useState<string[]>([]);
  const onPressGoBack = () => {
    if (gameFinished) navigation.replace("Home");
    else
      Alert.alert("Emin misiniz?", "İşte gidiyorsun.", [
        { text: "Vazgeç", style: "cancel", onPress: () => {} },
        { text: "Evet", style: "destructive", onPress: () => navigation.replace("Home") },
      ]);

    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onPressGoBack);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onPressGoBack);
    };
  }, []);

  const onPressClue = () => {
    if (clue.remaining > 0) {
      if (!data) return undefined;
      const char = getRandomClueChar(data.answer, clueChars);
      // console.log(char);

      if (char) {
        const newClueChars = [...clueChars];
        newClueChars.push(char);
        setClueChars(newClueChars);
      }

      setClue({ ...clue, remaining: clue.remaining - 1 });
    } else {
      setClue({ ...clue, showAdd: true });
    }
  };

  const onPressHomePage = () => {
    navigation.navigate("Home");
  };

  const onPressNewGame = () => {
    setClueChars([]);
    newGame();
  };

  const onPressSubmit = () => {
    submitData();
  };

  const onPressCancel = () => {
    removeCurrentMay();
  };

  const onPressKeyboard = (char: IChar) => {
    addCurrentMay(char.c);
  };

  if (gameLoading || data === undefined) return <Loading message="Oyun Yukleniyor.." />;
  console.log(clue);

  return (
    <>
      {clue.showAdd && (
        <AdsModal
          onEarned={() => {
            setClue({ remaining: 3, showAdd: false });
          }}
          onClosed={() => {
            setClue({ ...clue, showAdd: false });
          }}
          onFailed={() => {
            setClue({ ...clue, showAdd: false });
          }}
        />
      )}
      <Background bgColor={COLORS.COLOR_TONE7}>
        <Header gameFinished={gameFinished} remainingClue={clue.remaining} onPressGoBack={onPressGoBack} onPressClue={onPressClue} />
        <Body
          data={data}
          onPressKeyboard={onPressKeyboard}
          onPressSubmit={onPressSubmit}
          onPressCancel={onPressCancel}
          gameFinished={gameFinished}
          isValid={isValid}
          gameWon={gameWon}
          clueChars={clueChars}
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
