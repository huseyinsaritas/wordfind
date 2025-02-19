import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { useRouter } from "expo-router"; // ✅ expo-router navigasyonu
import { Background } from "../components/Base/Background";
import GoBack from "../components/Base/IconButtons/GoBack";
import { COLORS } from "../utils/constants/Colors";
import { useGlobalState } from "../context/globalState";
import { useLanguage } from "../hooks/useLanguage";
// import { AdBanner } from "../components/Adds/AdBanner";
import { FONT_FAMILY } from "../utils/constants/Layout";
import { SupportedLanguages } from "../utils/translations";
import Icon from "@expo/vector-icons/MaterialIcons";
import { Theme } from "@react-navigation/native";
import { useTheme, useThemedStyles } from "../hooks/useTheme";
// import { BannerAdSize } from "react-native-google-mobile-ads";
import DropDownPicker from "react-native-dropdown-picker";

export default function SettingsScreen() {
  const router = useRouter();
  const [languageOpen, setLanguageOpen] = useState(false);
  const { state, setState, playSound } = useGlobalState();
  const { t } = useLanguage();

  const style = useThemedStyles(styles);
  const { toggleThemeType, isDarkTheme, theme, themeType } = useTheme();

  const onPressGoBack = () => {
    playSound("click");
    router.back();
  };

  const toggleSwitch = () => {
    setLanguageOpen(false);
    // console.log("🔄 Önceki ses durumu:", state.soundsOn);
    setState((prev) => {
      const newSoundsOn = prev.soundsOn === 1 ? 0 : 1;
      // console.log("✅ Yeni ses durumu:", newSoundsOn);
      return { ...prev, soundsOn: newSoundsOn };
    });
  };

  return (
    <Background>
      <GoBack onPress={onPressGoBack} size={30} color={theme?.colors.text} />
      <View style={style.content}>
        <View style={style.form}>
          <Text style={style.header}>{t("gameSounds")}</Text>
          <Switch
            style={style.input}
            trackColor={{ false: COLORS.COMMON.BLACK, true: COLORS.COMMON.PALE_WHITE }}
            thumbColor={state.soundsOn ? COLORS.COMMON.BLUE : COLORS.COMMON.GRAY}
            onValueChange={() => {
              playSound("click");
              toggleSwitch();
            }}
            value={state.soundsOn === 1}
          />
        </View>
        <View style={style.form}>
          <Text style={style.header}>{t("darkTheme")}</Text>
          <Switch
            style={style.input}
            trackColor={{ false: COLORS.COMMON.BLACK, true: COLORS.COMMON.PALE_WHITE }}
            thumbColor={isDarkTheme ? COLORS.COMMON.BLUE : COLORS.COMMON.GRAY}
            onValueChange={() => {
              playSound("click");
              setLanguageOpen(false);
              toggleThemeType();
            }}
            value={isDarkTheme}
          />
        </View>

        <View style={style.dropdownContent}>
          <DropDownPicker
            style={style.dropdown}
            open={languageOpen}
            value={""}
            hideSelectedItemIcon={false}
            items={SupportedLanguages}
            setOpen={setLanguageOpen}
            onSelectItem={(item) => {
              playSound("click");
              setState((prev) => ({ ...prev, lan: item.value }));
            }}
            placeholder={t("languages")}
            setValue={() => {}}
            placeholderStyle={style.placeholderStyles}
            showTickIcon
            zIndex={1000}
            textStyle={style.dropdownText}
            listItemContainerStyle={style.dropdownList}
            listItemLabelStyle={style.dropdownLabel}
            disableBorderRadius={false}
            dropDownContainerStyle={style.dropdownContainer}
            selectedItemContainerStyle={style.dropdownContainer}
            selectedItemLabelStyle={style.dropdownLabel}
            ArrowDownIconComponent={() => <Icon name="keyboard-arrow-down" size={30} color={theme.colors.text} />}
            ArrowUpIconComponent={() => <Icon name="keyboard-arrow-up" size={30} color={theme.colors.text} />}
            TickIconComponent={() => <Icon name="check" size={25} color={theme.colors.text} />}
            theme={themeType === "dark" ? "DARK" : "LIGHT"}
          />
        </View>
      </View>
    </Background>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    content: {
      paddingVertical: 16,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      height: "100%",
    },
    contentProps: {
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
    dropdownContent: {
      paddingHorizontal: 8,
      paddingVertical: 20,
      borderColor: theme.colors.background,
    },
    dropdownContainer: {
      borderWidth: 0,
      borderColor: theme.colors.background,
      backgroundColor: theme.colors.background,
    },
    dropdown: {
      backgroundColor: theme.colors.background,
      borderWidth: 0,
      borderColor: theme.colors.background,
    },
    dropdownText: {
      fontWeight: "400",
      fontSize: 18,
      color: theme.colors.text,
      fontFamily: FONT_FAMILY.Black,
    },
    dropdownList: {
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.background,
      borderWidth: 0,
    },
    dropdownLabel: {
      color: theme.colors.text,
      borderWidth: 0,
      borderColor: theme.colors.background,
    },
    dropdownParent: {
      borderWidth: 0,
      borderColor: theme.colors.background,
    },
    form: {
      paddingHorizontal: 16,
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 22,
      alignItems: "center",
    },
    header: {
      fontSize: 18,
      color: theme.colors.text,
      fontFamily: FONT_FAMILY.Black,
    },
    input: {
      textAlign: "center",
      fontSize: 18,
      borderRadius: 4,
      fontFamily: FONT_FAMILY.Black,
    },
    language: {
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
      color: COLORS.COMMON.WHITE,
    },
  });
