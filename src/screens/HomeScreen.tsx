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

export const HomeScreen: React.FC<NativeStackScreenProps<RootScreenParamList, "Home">> = ({ navigation }) => {
  const [length, setLength] = useState<number>();
  const { state, setState } = useGlobalState();
  const { t, l } = useLanguage();

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
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <SettingsButton style={styles.headerItem} size={25} onPress={() => navigation.navigate("Settings")} />
          </View>
          <View>
            <InfoButton style={styles.headerItem} size={30} onPress={() => navigation.navigate("Info")} />
          </View>
        </View>
        <View style={styles.info}>
          <TouchableOpacity style={[styles.button, length === 5 && styles.selected]} onPress={() => setLength(5)}>
            <Text style={styles.buttonText}>{t("fiveLetters")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, length === 6 && styles.selected]} onPress={() => setLength(6)}>
            <Text style={styles.buttonText}>{t("sixLetters")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, length === 7 && styles.selected]} onPress={() => setLength(7)}>
            <Text style={styles.buttonText}>{t("sevenLetters")}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.start}>
          {length && (
            <TouchableOpacity style={styles.startButton} onPress={onGame}>
              <View style={styles.startButton}>
                <Text style={styles.startButtonText}>{t("newGame")}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </FullBackground>
  );
};

const styles = StyleSheet.create({
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
    borderWidth: 1,
    borderColor: COLORS.COMMON.GRAY,
    color: COLORS.COMMON.WHITE,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderBottomWidth: 1,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: COLORS.COMMON.GREEN_SUPER_LIGHT,
    fontFamily: FONT_FAMILY.Black,
  },
  selected: {
    backgroundColor: COLORS.COMMON.GRAY,
    borderColor: COLORS.COMMON.GREEN_SUPER_LIGHT,
  },
  startButton: {},
  startButtonText: {
    fontSize: 20,
    fontFamily: FONT_FAMILY.Black,
    color: "white",
  },
});
