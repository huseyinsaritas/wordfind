import React, { useEffect } from "react";
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Background } from "../components/Base/Background";
import { RootScreenParamList } from "../types";
import { COLORS } from "../constants/Colors";
import { Button } from "../components/Base/Button/Button";
import { DISCLOSE_TIME_MS, FONT_FAMILY } from "../constants/Layout";
import { useLanguage } from "../hooks/useLanguage";
import { useThemedStyles } from "../hooks/useTheme";
import { Theme } from "@react-navigation/native";
import { useGlobalState } from "../global/globalState";
import Icon from "@expo/vector-icons/Ionicons";

export const InfoScreen: React.FC<NativeStackScreenProps<RootScreenParamList, "Info">> = ({ navigation }) => {
  const animationDuration = DISCLOSE_TIME_MS;
  const rotateAnimation = new Animated.Value(0);
  const { t } = useLanguage();
  const { playSound } = useGlobalState();

  const style = useThemedStyles(styles);

  const onPressGoBack = () => {
    playSound("click");
    navigation.goBack();
  };

  useEffect(() => {
    Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: animationDuration,
      delay: 500,
      useNativeDriver: true,
    }).start(() => {
      rotateAnimation.setValue(0);
    });
  }, []);

  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const animatedStyle = {
    transform: [
      {
        rotateX: interpolateRotating,
      },
    ],
  };

  return (
    <Background>
      <View>
        <Text style={style.infoHeader}>{t("howToPlay")}</Text>
        <Text style={style.infoHeaderText}>{t("howToPlayDesc1")}</Text>
        <Text style={style.infoHeaderText}>{t("howToPlayDesc2")}</Text>
      </View>
      <View style={style.horizontalLine} />

      <ScrollView style={style.bodyScroll}>
        <View style={style.infoContent}>
          {/* <View style={style.infoRow}>
            <TouchableOpacity style={style.clue}>
              <View style={style.clueContent}>
                <Icon style={style.clueButton} name="ios-bulb" size={22} color={COLORS.COMMON.YELLOW} />
                <Text style={style.clueText}>3</Text>
              </View>
            </TouchableOpacity>
            <Text style={style.infoText}>{t("clueInfo")}</Text>
          </View> */}
          <View style={style.example}>
            <Text style={style.exampleHeader}>{t("examples")}</Text>
          </View>
          <View style={style.infoRow}>
            <View style={style.answersGroupContent}>
              <Animated.View style={[style.answerItem, { backgroundColor: COLORS.COMMON.DARKGRAY }, { ...animatedStyle }]}>
                <Text style={[style.tStyle, { color: COLORS.COMMON.WHITE }]}>{t("infoFirstRowFirstChar")}</Text>
              </Animated.View>
              <View style={style.answerItem}>
                <Text style={style.tStyle}>{t("infoFirstRowSecondChar")}</Text>
              </View>
              <View style={style.answerItem}>
                <Text style={style.tStyle}>{t("infoFirstRowThirdChar")}</Text>
              </View>
              <View style={style.answerItem}>
                <Text style={style.tStyle}>{t("infoFirstRowFourthChar")}</Text>
              </View>
              <View style={style.answerItem}>
                <Text style={style.tStyle}>{t("infoFirstRowFifthChar")}</Text>
              </View>
            </View>
            <Text style={style.infoText}>
              {t("infoFirstRowFirstChar")} {t("isNotInTheWord")}
            </Text>
          </View>

          <View style={style.infoRow}>
            <View style={style.answersGroupContent}>
              <View style={style.answerItem}>
                <Text style={style.tStyle}>{t("infoSecondRowFirstChar")}</Text>
              </View>
              <View style={style.answerItem}>
                <Text style={style.tStyle}>{t("infoSecondRowSecondChar")}</Text>
              </View>
              <Animated.View style={[style.answerItem, { backgroundColor: COLORS.COMMON.YELLOW }, { ...animatedStyle }]}>
                <Text style={[style.tStyle, { color: COLORS.COMMON.WHITE }]}>{t("infoSecondRowThirdChar")}</Text>
              </Animated.View>
              <View style={style.answerItem}>
                <Text style={style.tStyle}>{t("infoSecondRowFourthChar")}</Text>
              </View>
              <View style={style.answerItem}>
                <Text style={style.tStyle}>{t("infoSecondRowFifthChar")}</Text>
              </View>
            </View>
            <Text style={style.infoText}>
              {t("infoSecondRowThirdChar")} {t("wrongSpot")}
            </Text>
          </View>
          <View style={style.infoRow}>
            <View style={style.answersGroupContent}>
              <View style={style.answerItem}>
                <Text style={style.tStyle}>{t("infoThirdRowFirstChar")}</Text>
              </View>
              <View style={style.answerItem}>
                <Text style={style.tStyle}>{t("infoThirdRowSecondChar")}</Text>
              </View>
              <View style={style.answerItem}>
                <Text style={style.tStyle}>{t("infoThirdRowThirdChar")}</Text>
              </View>
              <View style={style.answerItem}>
                <Text style={style.tStyle}>{t("infoThirdRowFourthChar")}</Text>
              </View>
              <Animated.View style={[style.answerItem, { backgroundColor: COLORS.COMMON.GREEN }, { ...animatedStyle }]}>
                <Text style={[style.tStyle, { color: COLORS.COMMON.WHITE }]}>{t("infoThirdRowFifthChar")}</Text>
              </Animated.View>
            </View>
            <Text style={style.infoText}>
              {t("infoThirdRowFifthChar")} {t("correctSpot")}
            </Text>
          </View>
        </View>
        <View style={style.infoButtonContent}>
          <Button style={style.infoButton} text={t("understood")} backgroundColor={COLORS.COMMON.GREEN} onPress={onPressGoBack} />
        </View>
      </ScrollView>
    </Background>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    infoHeader: {
      width: "100%",
      color: theme.colors.text,
      fontSize: 30,
      fontWeight: "bold",
      paddingLeft: 15,
      marginVertical: 20,
    },
    infoHeaderText: {
      width: "100%",
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: "bold",
      paddingLeft: 15,
      paddingRight: 4,
      marginVertical: 10,
    },
    example: {
      width: "100%",
      display: "flex",
      marginLeft: 60,
    },
    exampleHeader: {
      width: "100%",
      color: theme.colors.text,
      fontSize: 22,
      fontWeight: "bold",
      paddingLeft: 15,
      paddingRight: 4,
      marginVertical: 10,
    },
    clue: {
      display: "flex",
      width: 300,
      alignItems: "flex-start",
    },
    clueContent: {
      display: "flex",
      flexDirection: "row",
      width: 60,
      marginTop: 5,
      backgroundColor: COLORS.COMMON.GRAY,
      borderRadius: 10,
      paddingVertical: 2,
      paddingHorizontal: 10,
    },
    clueButton: {
      paddingRight: 5,
      paddingTop: 2,
    },
    clueText: {
      fontSize: 24,
      color: "#fff",
      fontFamily: FONT_FAMILY.Black,
      paddingRight: 5,
    },
    horizontalLine: {
      width: "100%",
      height: 2,
      marginTop: 20,
      backgroundColor: theme.colors.text,
    },
    bodyScroll: {
      display: "flex",
      flex: 1,
      height: "100%",
    },
    infoContent: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    infoRow: {
      width: 300,
      marginVertical: 15,
    },
    answersGroupContent: {
      display: "flex",
      flexDirection: "row",
    },
    answerItem: {
      borderWidth: 3,
      borderRadius: 6,
      width: 45,
      height: 45,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 3,
      marginVertical: 5,
      borderColor: COLORS.COMMON.GRAY,
    },

    tStyle: {
      fontSize: 25,
      fontFamily: FONT_FAMILY.Black,
      color: theme.colors.text,
    },
    infoText: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: "bold",
      paddingLeft: 10,
      marginTop: 10,
    },
    infoButtonContent: {
      // position: "absolute",
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",
      marginVertical: 15,
      paddingHorizontal: 40,
      left: 0,
      right: 0,
      // bottom: -Dimensions.get("window").height / 7,
    },
    infoButton: {
      width: Dimensions.get("window").width > 500 ? "50%" : "100%",
    },
  });
