import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useLanguage } from "../hooks/useLanguage";
import { IChar } from "../utils/model/Char";
import { Loading } from "../components/Base/Loading";
import { Body } from "../components/Body";
import { Alert, BackHandler } from "react-native";
import { useGame } from "../hooks/useGame";
import { Footer } from "../components/Footer";
import { DISCLOSE_TIME_MS } from "../utils/constants/Layout";
import { GameFinishedModal } from "../components/Body/GameFinishedModal";
import { Delayed } from "../components/Base/Delayed/Delayed";
import { Background } from "../components/Base/Background";
import { AdsModal } from "../components/AdsModal/AdsModal";
import { getRandomClueChar } from "../utils/index";
import { useGlobalState } from "../context/globalState";
import { useTheme } from "../hooks/useTheme";

export default function GameScreen() {
  const router = useRouter();
  const { length } = useLocalSearchParams();
  const { gameLoading, gameFinished, data, addCurrentMay, removeCurrentMay, removeAllCurrentMay, submitData, newGame, shake, gameWon, keysDisabled, timer } = useGame(
    Number(length)
  );
  const [clue, setClue] = useState<{ showAds: boolean; remaining: number }>({ showAds: false, remaining: 3 });
  const [clueChars, setClueChars] = useState<string[]>([]);
  const [refresh, setRefresh] = useState(0);
  const { t } = useLanguage();
  const { playSound } = useGlobalState();
  const { theme } = useTheme();

  const onPressGoBack = () => {
    playSound("click");
    if (gameFinished) {
      router.replace("/");
    } else {
      Alert.alert(t("areYouSure"), t("leaveMessage"), [
        { text: t("continue"), style: "cancel", onPress: () => playSound("click") },
        {
          text: t("exitGame"),
          style: "destructive",
          onPress: () => {
            playSound("click");
            router.replace("/");
          },
        },
      ]);
    }
    return true;
  };

  const forceUpdate = () => setRefresh((prev) => prev + 1);

  useEffect(() => {
    const backAction = () => {
      onPressGoBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [gameFinished, router, playSound, t]);

  useEffect(() => {
    if (gameFinished) {
      playSound(gameWon ? "gameWon" : "gameOver");
    }
  }, [gameFinished]);

  useEffect(() => {
    setClueChars((prev) => [...prev]);
  }, [clue.showAds]);

  const onPressClue = () => {
    if (clue.remaining > 0) {
      if (!data) return;

      // Kullanıcının doğru tahmin ettiği harfleri bul (state === 2)
      const correctChars = data.mays.flatMap((may) => may.chars.filter((char) => char.state === 1 || char.state === 2).map((char) => char.char));

      // Kullanıcının doğru tahmin ettiği benzersiz harfleri bul
      const uniqueCorrectChars = [...new Set(correctChars)];

      // Kullanıcının alabileceği maksimum ipucu sayısını hesapla
      const maxClues = data.answer.length - 2 - uniqueCorrectChars.length;

      // Kullanıcının şu ana kadar aldığı ipucu sayısı
      const usedClues = clueChars.length;

      // Eğer kullanıcının alabileceği ipucu sayısı 0'dan büyükse ve daha fazla ipucu alabilirse
      if (usedClues < maxClues) {
        const char = getRandomClueChar(data.answer, data.mays, clueChars);
        if (char) {
          setClueChars((prevChars) => [...prevChars, char]);
          setClue((prev) => ({ ...prev, remaining: prev.remaining - 1 }));
          playSound("bonus");
        } else {
          // Eğer rastgele bir ipucu harfi bulunamazsa (örneğin, tüm harfler zaten biliniyorsa)
          // Bu durumda, kullanıcıya "Daha fazla ipucu alamazsın." mesajını göster
          window.toastr?.show(t("noMoreClues"), {
            type: "normal",
            animationType: "zoom-in",
            placement: "top",
            animationDuration: 200,
            duration: 1500,
            style: { backgroundColor: theme.colors.notification },
            textStyle: { color: theme.colors.primary },
          });
        }
      } else {
        // Kullanıcının daha fazla ipucu alamayacağı durumda
        if (usedClues > 0) {
          // Kullanıcı zaten ipucu almış, ancak daha fazla alamaz
          window.toastr?.show(t("noMoreClues"), {
            type: "normal",
            animationType: "zoom-in",
            placement: "top",
            animationDuration: 200,
            duration: 1500,
            style: { backgroundColor: theme.colors.notification },
            textStyle: { color: theme.colors.primary },
          });
        } else {
          // Kullanıcı hiç ipucu almamış, ancak kelimenin çoğunu zaten bilmiş
          window.toastr?.show(t("almostNoClues"), {
            type: "normal",
            animationType: "zoom-in",
            placement: "top",
            animationDuration: 200,
            duration: 1500,
            style: { backgroundColor: theme.colors.notification },
            textStyle: { color: theme.colors.primary },
          });
        }
      }
    } else {
      // Kullanıcının ipucu hakkı kalmadığında reklam modalını aç
      setClue((prev) => ({ ...prev, showAds: true }));
      playSound("noBonus");
    }
  };

  const onPressHomePage = () => {
    router.push("/");
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
          setClueChars([]);
          playSound("bonus");
          forceUpdate();
        }}
        onClosed={() => {
          setClue((prev) => ({ ...prev, showAds: false }));
        }}
        onFailed={() => {
          window.toastr?.show(t("noAdToShow"), {
            type: "normal",
            animationType: "zoom-in",
            placement: "top",
            style: { backgroundColor: theme.colors.notification },
            textStyle: { color: theme.colors.primary },
          });
          setClue((prev) => ({ ...prev }));
        }}
        onModalClose={() => {
          setClue((prev) => ({ ...prev, showAds: false }));
          forceUpdate();
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
}
