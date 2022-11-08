import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
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
import Icon from "@expo/vector-icons/MaterialIcons";
import { Theme } from "@react-navigation/native";
import { useTheme, useThemedStyles } from "../hooks/useTheme";
import { BannerAdSize } from "react-native-google-mobile-ads";
import DropDownPicker from "react-native-dropdown-picker";

export const SettingsScreen: React.FC<NativeStackScreenProps<RootScreenParamList, "Settings">> = ({ navigation }) => {
  const [languageOpen, setLanguageOpen] = useState(false);
  const { state, setState, playSound } = useGlobalState();
  const { t } = useLanguage();

  const style = useThemedStyles(styles);
  const { toggleThemeType, isDarkTheme, theme, themeType } = useTheme();

  const onPressGoBack = () => {
    playSound("click");
    navigation.goBack();
  };

  const toggleSwitch = () => {
    setLanguageOpen(false);
    setState((prev) => ({ ...prev, soundsOn: prev.soundsOn === 1 ? 0 : 1 }));
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
            // ios_backgroundColor={COLORS.COMMON.BLACK}
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
            // ios_backgroundColor={COLORS.COMMON.BLACK}
            onValueChange={() => {
              playSound("click");
              setLanguageOpen(false);
              toggleThemeType();
            }}
            value={isDarkTheme}
          />
        </View>
        {/* <View style={style.form}>
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
        </View> */}
        <View style={style.dropdownContent}>
          <DropDownPicker
            style={style.dropdown}
            open={languageOpen}
            value={""}
            hideSelectedItemIcon={false}
            // value={t("languages")} //genderValue
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
            ArrowDownIconComponent={() => {
              return <Icon name="keyboard-arrow-down" size={30} color={theme.colors.text} />;
            }}
            ArrowUpIconComponent={() => {
              return <Icon name="keyboard-arrow-up" size={30} color={theme.colors.text} />;
            }}
            TickIconComponent={() => {
              return <Icon name="check" size={25} color={theme.colors.text} />;
            }}
            theme={themeType === "dark" ? "DARK" : "LIGHT"}
          />
        </View>
        <View style={style.banner}>
          <AdBanner size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
        </View>
      </View>
    </Background>
  );
};

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
    banner: {
      zIndex: 2,
      position: "absolute",
      textAlign: "center",
      alignItems: "center",
      width: "100%",
      bottom: 30,
    },
  });
