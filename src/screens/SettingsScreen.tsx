import React from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Background } from "../components/Base/Background";
import { RootScreenParamList } from "../types";
import GoBack from "../components/Base/IconButtons/GoBack";
import { COLORS } from "../constants/Colors";
import { useGlobalState } from "../global/globalState";
import { useLanguage } from "../hooks/useLanguage";
import { AdBanner } from "../components/Adds/AdBanner";
import { FONT_FAMILY } from "../constants/Layout";
import { SupportedLanguages } from "../translations";

import { Theme } from "@react-navigation/native";
import { useTheme, useThemedStyles } from "../hooks/useTheme";
import { BannerAdSize } from "react-native-google-mobile-ads";

export const SettingsScreen: React.FC<NativeStackScreenProps<RootScreenParamList, "Settings">> = ({ navigation }) => {
  const { state, setState } = useGlobalState();
  const { t } = useLanguage();
  const { toggleThemeType, isDarkTheme, theme } = useTheme();

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const toggleSwitch = () => {
    setState((prev) => ({ ...prev, sound: prev.sound === 1 ? 0 : 1 }));
  };
  const style = useThemedStyles(styles);
  return (
    <Background>
      <GoBack onPress={onPressGoBack} size={30} color={theme.colors.text} />
      <View style={style.content}>
        <View style={style.form}>
          <Text style={style.header}>{t("gameSounds")}</Text>
          <Switch
            style={style.input}
            trackColor={{ false: COLORS.COMMON.BLACK, true: COLORS.COMMON.PALE_WHITE }}
            thumbColor={state.sound ? COLORS.COMMON.BLUE : COLORS.COMMON.COLOR_TONE2}
            // ios_backgroundColor={COLORS.COMMON.BLACK}
            onValueChange={toggleSwitch}
            value={state.sound === 1}
          />
        </View>

        <View style={style.form}>
          <Text style={style.header}>{t("darkTheme")}</Text>
          <Switch
            style={style.input}
            trackColor={{ false: COLORS.COMMON.BLACK, true: COLORS.COMMON.PALE_WHITE }}
            thumbColor={isDarkTheme ? COLORS.COMMON.BLUE : COLORS.COMMON.COLOR_TONE2}
            // ios_backgroundColor={COLORS.COMMON.BLACK}
            onValueChange={toggleThemeType}
            value={isDarkTheme}
          />
        </View>

        <View style={style.form}>
          <Text style={style.header}>{t("languages")}</Text>
          <View>
            {SupportedLanguages.map((l, i) => (
              <View style={style.language} key={i + 1}>
                <TouchableOpacity
                  // style={styles.lbutton}
                  onPress={() => {
                    setState((prev) => ({ ...prev, lan: l.code }));
                  }}
                >
                  <Text style={style.header}>{l.name}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View style={style.banner}>
          <AdBanner size={BannerAdSize.FULL_BANNER} />
        </View>
      </View>
    </Background>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    content: {
      // flex: 1,
      padding: 16,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      height: "100%",
      /* borderWidth: 1,
    borderColor: "white", */
    },
    contentProps: {
      // flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    title: {
      textAlign: "center",
      fontSize: 24,
      color: theme.colors.text,
      fontFamily: FONT_FAMILY.Black,
    },

    form: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 22,
      alignItems: "center",
    },
    header: {
      /* textAlign: "center", */
      fontSize: 18,
      color: theme.colors.text,
      fontFamily: FONT_FAMILY.Black,
    },
    input: {
      textAlign: "center",
      fontSize: 18,
      borderRadius: 4,
      // color: theme.colors.text,
      fontFamily: FONT_FAMILY.Black,
    },
    language: {
      // backgroundColor: COLORS.COMMON.BLUE,
      marginVertical: 10,
      height: 30,
      width: "100%",
      display: "flex",
      flexDirection: "column",
    },

    lbutton: {
      paddingVertical: 12,
      margin: 10,
      borderRadius: 4,
      // backgroundColor: COLORS.COMMON.BLUE,
      color: COLORS.COMMON.WHITE,
    },
    banner: {
      zIndex: 2,
      position: "absolute",
      textAlign: "center",
      alignItems: "center",
      width: "100%",
      bottom: 30,
    },
  });
