import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Platform, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { FONT_FAMILY } from "../utils/constants/Layout";
import { COLORS } from "../utils/constants/Colors";
import { FullBackground } from "../components/Base/FullBackGround/FullBackground";
import { InfoButton } from "../components/Base/IconButtons/InfoButton";
import { SettingsButton } from "../components/Base/IconButtons/SettingsButton";
import { useGlobalState } from "../context/globalState";
import { useLanguage } from "../hooks/useLanguage";
import { UpdateRequired } from "../components/UpdateRequired/UpdateRequired";
import { CONF } from "../utils/conf";
import { Logo } from "../components/Base/Logo/Logo";
import { useTheme, useThemedStyles } from "../hooks/useTheme";
import { Theme } from "@react-navigation/native";

export default function HomeScreen() {
  const router = useRouter();
  const [length, setLength] = useState<number>();
  const { state, setState, playSound } = useGlobalState();
  const { t } = useLanguage();

  const { theme } = useTheme();
  const style = useThemedStyles(styles);

  const updateRequired: boolean = CONF.VER !== state.gameConf?.version;

  const onGame = () => {
    if (length) {
      const newGameCount = (state.gameCount ?? 0) + 1;
      playSound("click");
      setState((prev) => ({ ...prev, gameCount: newGameCount }));
      router.replace({ pathname: "/game", params: { length } });
    }
  };

  if (updateRequired) return <UpdateRequired version={state.gameConf?.version} />;

  return (
    <FullBackground>
      <View style={style.container}>
        <View style={style.header}>
          <View>
            <SettingsButton
              color={theme.colors.text}
              style={style.headerItem}
              size={25}
              onPress={() => {
                playSound("click");
                router.push("/settings");
              }}
            />
          </View>
          <View>
            <InfoButton
              color={theme.colors.text}
              style={style.headerItem}
              size={30}
              onPress={() => {
                playSound("click");
                router.push("/info");
              }}
            />
          </View>
        </View>
        <Logo />
        <View style={style.info}>
          <TouchableOpacity
            style={[style.button, length === 5 && style.selectedButton]}
            onPress={() => {
              playSound("click");
              setLength(5);
            }}
          >
            <Text style={[style.buttonText, length === 5 && style.selectedButtonText]}>{t("fiveLetters")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.button, length === 6 && style.selectedButton]}
            onPress={() => {
              playSound("click");
              setLength(6);
            }}
          >
            <Text style={[style.buttonText, length === 6 && style.selectedButtonText]}>{t("sixLetters")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.button, length === 7 && style.selectedButton]}
            onPress={() => {
              playSound("click");
              setLength(7);
            }}
          >
            <Text style={[style.buttonText, length === 7 && style.selectedButtonText]}>{t("sevenLetters")}</Text>
          </TouchableOpacity>
        </View>
        <View style={style.start}>
          {length && (
            <TouchableOpacity style={style.startButton} onPress={onGame}>
              <View style={style.startButton}>
                <Text style={style.startButtonText}>{t("startGame")}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </FullBackground>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    headerItem: {
      paddingHorizontal: 20,
      paddingVertical: Platform.OS === "ios" ? 10 : 30,
    },
    info: {
      height: Dimensions.get("window").height / 2,
      width: "100%",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1,
    },
    start: {
      position: "absolute",
      width: "100%",
      textAlign: "center",
      alignItems: "center",
      bottom: 50,
      zIndex: 1,
    },
    button: {
      width: 275,
      height: 60,
      marginTop: 20,
      paddingHorizontal: 8,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      overflow: "hidden",
      borderWidth: 2,
      borderColor: COLORS.COMMON.GRAY,
      color: COLORS.COMMON.WHITE,
      shadowColor: "#ccc",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      borderBottomWidth: 2,
    },
    buttonText: {
      textAlign: "center",
      fontSize: 20,
      color: theme.colors.card,
      fontFamily: FONT_FAMILY.Black,
    },
    selectedButton: {
      backgroundColor: COLORS.COMMON.GRAY,
    },
    selectedButtonText: {
      color: COLORS.COMMON.WHITE,
    },
    startButton: {
      width: 275,
      height: 60,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.COMMON.GREEN,
      shadowColor: "#ccc",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      borderRadius: 5,
    },
    startButtonText: {
      fontSize: 20,
      fontFamily: FONT_FAMILY.Black,
      color: COLORS.COMMON.WHITE,
      overflow: "hidden",
    },
  });
