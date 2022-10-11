import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootScreenParamList } from "../types";
import { useLanguage } from "../hooks/useLanguage";
import { IChar } from "../model/Char";
import { Loading } from "../components/Base/Loading";
import { Body } from "../components/Body";
import { Alert } from "react-native";
import { useGame } from "../hooks/useGame";
import { Footer } from "../components/Footer";
import { DISCLOSE_TIME_MS } from "../constants/Layout";
import { GameOver } from "../components/Body/GameOver";
import { Delayed } from "../components/Base/Delayed/Delayed";
import { Background } from "../components/Base/Background";
import { AdsModal } from "../components/AdsModal/AdsModal";
import { getRandomClueChar } from "../util";
import { BackHandler } from "react-native";
import { useSounds } from "../hooks/useSounds";
import Toast from "react-native-root-toast";

export const GameScreen: React.FC<NativeStackScreenProps<RootScreenParamList, "Game">> = ({ navigation, route }) => {
  const { length } = route.params;
  const { gameLoading, gameFinished, data, addCurrentMay, removeCurrentMay, submitData, newGame, isValid, gameWon, keysDisabled } = useGame(length);
  const [clue, setClue] = useState<{ showAds: boolean; remaining: number }>({ showAds: false, remaining: 3 });
  const [clueChars, setClueChars] = useState<string[]>([]);
  const { t } = useLanguage();
  const { play } = useSounds();

  const onPressGoBack = () => {
    if (gameFinished) navigation.replace("Home");
    else
      Alert.alert(t("areYouSure"), t("leaveMessage"), [
        { text: t("continue"), style: "cancel", onPress: () => {} },
        { text: t("exitGame"), style: "destructive", onPress: () => navigation.replace("Home") },
      ]);

    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onPressGoBack);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onPressGoBack);
    };
  }, []);

  // useEffect(() => {
  //   navigation.addListener("beforeRemove", (e) => {
  //     e.preventDefault();
  //     onPressGoBack();
  //   });
  //   return () => {
  //     navigation.removeListener("beforeRemove", () => {
  //       console.log("beforeRemove removed.");
  //     });
  //   };
  // }, []);

  useEffect(() => {
    if (gameFinished) {
      if (gameWon) {
        play("game-won");
      } else {
        play("game-over");
      }
    }
  }, [gameFinished]);

  const onPressClue = () => {
    if (clue.remaining > 0) {
      if (!data) return undefined;
      // const char = getRandomClueChar(data.answer, data.mays, clueChars);
      const char = "a";
      if (clueChars.length < 3 && char) {
        const newClueChars = [...clueChars];
        newClueChars.push(char);
        setClueChars(newClueChars);
        setClue({ ...clue, remaining: clue.remaining - 1 });
        play("bonus");
      } else {
        Toast.show(t("noTips"), {
          duration: Toast.durations.SHORT,
          position: 40,
          shadow: true,
          animation: true,
          hideOnPress: true,
          backgroundColor: "#fff",
          textColor: "#000",
          opacity: 1,
        });
      }
    } else {
      setClue({ ...clue, showAds: true });
      play("no-bonus");
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
    play("remove");
    removeCurrentMay();
  };

  const onPressKeyboard = (char: IChar) => {
    play("key");
    addCurrentMay(char.c);
  };

  if (gameLoading || data === undefined) return <Loading message="Oyun Yukleniyor.." />;

  return (
    <>
      <AdsModal
        show={clue.showAds}
        onEarned={() => {
          setClue({ remaining: 3, showAds: false });
        }}
        onClosed={() => {
          setClue({ ...clue, showAds: false });
        }}
        onFailed={() => {
          setClue({ ...clue });
        }}
        onModalClose={() => {
          setClue({ ...clue, showAds: false });
        }}
      />

      <Background>
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
          keysDisabled={keysDisabled}
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