import React, { useEffect } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Background } from "../components/Base/Background";
import { RootScreenParamList } from "../types";
import { COLORS } from "../constants/Colors";
import { Button } from "../components/Base/Button/Button";
import { DISCLOSE_TIME_MS, FONT_FAMILY } from "../constants/Layout";
import { useLanguage } from "../hooks/useLanguage";
import { useThemedStyles } from "../hooks/useTheme";
import { Theme } from "@react-navigation/native";

export const InfoScreen: React.FC<NativeStackScreenProps<RootScreenParamList, "Info">> = ({ navigation }) => {
  const animationDuration = DISCLOSE_TIME_MS;
  const rotateAnimation = new Animated.Value(0);
  const { t } = useLanguage();

  const style = useThemedStyles(styles);

  const onPressGoBack = () => {
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
    <Background bgColor={COLORS.COMMON.COLOR_TONE7}>
      <View>
        <Text style={style.infoHeader}>{t("howToPlay")}</Text>
        <Text style={style.infoHeaderText}>{t("howToPlayDesc1")}</Text>
        <Text style={style.infoHeaderText}>{t("howToPlayDesc2")}</Text>
      </View>
      <View style={style.horizontalLine} />
      {/* <View style={style.infoRowHeader}>
        <Text style={style.infoSubHeader}>Örnekler</Text>
      </View> */}
      <View style={style.infoRow}>
        <View style={style.answersGroupContent}>
          <Animated.View style={[style.answerItem, { backgroundColor: COLORS.COMMON.COLOR_TONE4 }, { ...animatedStyle }]}>
            <Text style={[style.tStyle, { color: COLORS.COMMON.WHITE }]}>B</Text>
          </Animated.View>
          <View style={style.answerItem}>
            <Text style={style.tStyle}>O</Text>
          </View>
          <View style={style.answerItem}>
            <Text style={style.tStyle}>Y</Text>
          </View>
          <View style={style.answerItem}>
            <Text style={style.tStyle}>O</Text>
          </View>
          <View style={style.answerItem}>
            <Text style={style.tStyle}>Z</Text>
          </View>
        </View>
        <Text style={style.infoText}>B harfi kelimede yok.</Text>
      </View>

      <View style={style.infoRow}>
        <View style={style.answersGroupContent}>
          <View style={style.answerItem}>
            <Text style={style.tStyle}>E</Text>
          </View>
          <View style={style.answerItem}>
            <Text style={style.tStyle}>K</Text>
          </View>
          <Animated.View style={[style.answerItem, { backgroundColor: COLORS.COMMON.YELLOW }, { ...animatedStyle }]}>
            <Text style={[style.tStyle, { color: COLORS.COMMON.WHITE }]}>M</Text>
          </Animated.View>
          <View style={style.answerItem}>
            <Text style={style.tStyle}>E</Text>
          </View>
          <View style={style.answerItem}>
            <Text style={style.tStyle}>K</Text>
          </View>
        </View>
        <Text style={style.infoText}>M harfi kelimede var, fakat yanlış yerde.</Text>
      </View>
      <View style={style.infoRow}>
        <View style={style.answersGroupContent}>
          <View style={style.answerItem}>
            <Text style={style.tStyle}>İ</Text>
          </View>
          <View style={style.answerItem}>
            <Text style={style.tStyle}>L</Text>
          </View>
          <View style={style.answerItem}>
            <Text style={style.tStyle}>H</Text>
          </View>
          <View style={style.answerItem}>
            <Text style={style.tStyle}>A</Text>
          </View>
          <Animated.View style={[style.answerItem, { backgroundColor: COLORS.COMMON.GREEN }, { ...animatedStyle }]}>
            <Text style={[style.tStyle, { color: COLORS.COMMON.WHITE }]}>M</Text>
          </Animated.View>
        </View>
        <Text style={style.infoText}>M harfi kelimede var ve doğru yerde.</Text>
      </View>
      <View style={style.infoButtonContent}>
        <Button text={t("understood")} backgroundColor={COLORS.COMMON.DARKANDGREEN} onPress={onPressGoBack} />
      </View>
    </Background>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    infoRowHeader: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      width: "100%",
      paddingLeft: 45,
      marginVertical: 15,
    },
    infoRow: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      width: "100%",
      marginVertical: 20,
      paddingLeft: 45,
    },
    answersGroupContent: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
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
      borderColor: COLORS.COMMON.COLOR_TONE4,
    },

    tStyle: {
      fontSize: 25,
      fontFamily: FONT_FAMILY.Black,
      color: theme.colors.text,
    },
    infoHeader: {
      color: theme.colors.text,
      fontSize: 30,
      fontWeight: "bold",
      paddingLeft: 15,
      marginVertical: 20,
    },
    infoSubHeader: {
      color: theme.colors.text,
      fontSize: 20,
      fontFamily: FONT_FAMILY.Black,
    },
    infoHeaderText: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: "bold",
      paddingLeft: 15,
      paddingRight: 4,
      marginVertical: 10,
    },
    infoText: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: "bold",
      paddingLeft: 10,
      marginTop: 10,
    },
    horizontalLine: {
      width: "100%",
      height: 2,
      marginVertical: 20,
      backgroundColor: COLORS.COMMON.COLOR_TONE4,
    },
    infoButtonContent: {
      position: "absolute",
      width: "100%",
      paddingHorizontal: 20,
      bottom: 20,
      left: 0,
      right: 0,
    },
  });
