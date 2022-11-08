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
import { GameFinishedModal } from "../components/Body/GameFinishedModal";
import { Delayed } from "../components/Base/Delayed/Delayed";
import { Background } from "../components/Base/Background";
import { AdsModal } from "../components/AdsModal/AdsModal";
import { getRandomClueChar } from "../util";
import { BackHandler } from "react-native";
import { useGlobalState } from "../global/globalState";
import { useTheme } from "../hooks/useTheme";

export const GameScreen: React.FC<NativeStackScreenProps<RootScreenParamList, "Game">> = ({ navigation, route }) => {
  const { length } = route.params;
  const { gameLoading, gameFinished, data, addCurrentMay, removeCurrentMay, removeAllCurrentMay, submitData, newGame, shake, gameWon, keysDisabled, timer } = useGame(length);
  const [clue, setClue] = useState<{ showAds: boolean; remaining: number }>({ showAds: false, remaining: 3 });
  const [clueChars, setClueChars] = useState<string[]>([]);
  const { t } = useLanguage();
  const { playSound } = useGlobalState();
  const { theme } = useTheme();

  const onPressGoBack = () => {
    playSound("click");
    if (gameFinished) navigation.replace("Home");
    else
      Alert.alert(t("areYouSure"), t("leaveMessage"), [
        { text: t("continue"), style: "cancel", onPress: () => playSound("click") },
        {
          text: t("exitGame"),
          style: "destructive",
          onPress: () => {
            playSound("click");
            navigation.replace("Home");
          },
        },
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
        playSound("gameWon");
      } else {
        playSound("gameOver");
      }
    }
  }, [gameFinished]);

  const onPressClue = () => {
    if (clue.remaining > 0) {
      if (!data) return undefined;
      const char = getRandomClueChar(data.answer, data.mays, clueChars);
      if (clueChars.length < data.answer.length - 2 && char) {
        const newClueChars = [...clueChars];
        newClueChars.push(char);
        setClueChars(newClueChars);
        setClue({ ...clue, remaining: clue.remaining - 1 });
        playSound("bonus");
      } else {
        window.toastr?.show(t("noTips"), {
          type: "normal",
          animationType: "zoom-in",
          placement: "top",
          animationDuration: 200,
          duration: 1500,
          style: {
            backgroundColor: theme.colors.notification,
          },
          textStyle: {
            color: theme.colors.primary,
          },
        });
      }
    } else {
      setClue({ ...clue, showAds: true });
      playSound("noBonus");
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

  const onLongPressCancel = () => {
    removeAllCurrentMay();
  };

  const onPressKeyboard = (char: IChar) => {
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
        onFailed={(err: string) => {
          window.toastr?.show(t("noAdToShow"), {
            type: "normal",
            animationType: "zoom-in",
            placement: "top",
            style: {
              backgroundColor: theme.colors.notification,
            },
            textStyle: {
              color: theme.colors.primary,
            },
          });
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
          onLongPressCancel={onLongPressCancel}
          gameFinished={gameFinished}
          shake={shake}
          gameWon={gameWon}
          clueChars={clueChars}
          keysDisabled={keysDisabled}
        />
        <Footer />
      </Background>

      {gameFinished && (
        <Delayed waitBeforeShow={DISCLOSE_TIME_MS * data.answer.length}>
          <GameFinishedModal data={data} gameWon={gameWon} onPressNewGame={onPressNewGame} onPressHomePage={onPressHomePage} time={timer} />
        </Delayed>
      )}
    </>
  );
};
