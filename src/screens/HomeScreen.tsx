import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Platform } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FONT_FAMILY } from "../constants/Layout";
import { RootScreenParamList } from "../types";
import { COLORS } from "../constants/Colors";
import { FullBackground } from "../components/Base/FullBackGround/FullBackground";
import { InfoButton } from "../components/Base/IconButtons/InfoButton";
import { SettingsButton } from "../components/Base/IconButtons/SettingsButton";
import { useGlobalState } from "../global/globalState";
import { useLanguage } from "../hooks/useLanguage";
import { UpdateRequired } from "../components/UpdateRequired/UpdateRequired";
import { CONF } from "../conf";
import { Logo } from "../components/Base/Logo/Logo";
import { useTheme, useThemedStyles } from "../hooks/useTheme";
import { Theme } from "@react-navigation/native";

export const HomeScreen: React.FC<NativeStackScreenProps<RootScreenParamList, "Home">> = ({ navigation }) => {
  const [length, setLength] = useState<number>();
  const { state, setState } = useGlobalState();
  const { t, l } = useLanguage();
  const { theme } = useTheme();
  const style = useThemedStyles(styles);

  const updateRequired: boolean = CONF.VER !== state.version;

  const onGame = () => {
    if (length) {
      const newGameCount = (state.gameCount ?? 0) + 1;
      setState((prev) => ({ ...prev, gameCount: newGameCount }));
      navigation.replace("GamePre", {
        length,
      });
    }
  };

  if (updateRequired) return <UpdateRequired version={state.version} />;

  return (
    <FullBackground>
      <View style={style.container}>
        <View style={style.header}>
          <View>
            <SettingsButton color={theme.colors.text} style={style.headerItem} size={25} onPress={() => navigation.navigate("Settings")} />
          </View>
          <View>
            <InfoButton color={theme.colors.text} style={style.headerItem} size={30} onPress={() => navigation.navigate("Info")} />
          </View>
        </View>
        <Logo />
        <View style={style.info}>
          <TouchableOpacity style={[style.button, length === 5 && style.selected]} onPress={() => setLength(5)}>
            <Text style={[style.buttonText, length === 5 && style.selected]}>{t("fiveLetters")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[style.button, length === 6 && style.selected]} onPress={() => setLength(6)}>
            <Text style={[style.buttonText, length === 6 && style.selected]}>{t("sixLetters")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[style.button, length === 7 && style.selected]} onPress={() => setLength(7)}>
            <Text style={[style.buttonText, length === 7 && style.selected]}>{t("sevenLetters")}</Text>
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
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      // padding: 10,
      // paddingVertical: 20,
    },
    headerItem: {
      paddingHorizontal: 20,
      paddingVertical: Platform.OS === "ios" ? 10 : 30,
    },
    info: {
      position: "absolute",
      width: "100%",
      textAlign: "center",
      alignItems: "center",
      top: "40%",
      zIndex: 1,
    },
    start: {
      position: "absolute",
      width: "100%",
      textAlign: "center",
      alignItems: "center",
      top: "85%",
      zIndex: 1,
    },
    button: {
      width: 275,
      height: 60,
      marginTop: 30,
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
    selected: {
      backgroundColor: COLORS.COMMON.GRAY,
      color: COLORS.COMMON.WHITE,
    },
    startButton: {
      width: 275,
      height: 60,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // borderWidth: 2,
      backgroundColor: COLORS.COMMON.GREEN,
      shadowColor: "#ccc",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      // borderBottomWidth: 2,
      borderRadius: 5,
    },
    startButtonText: {
      fontSize: 20,
      fontFamily: FONT_FAMILY.Black,
      color: COLORS.COMMON.WHITE,
      overflow: "hidden",
    },
  });
