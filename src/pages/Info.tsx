import React, { useEffect } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Background } from "../components/Base/Background";
import { RootScreenParamList } from "../types";
import { COLORS } from "../constants/Colors";
import { Button } from "../components/Base/Button/Button";
import { DISCLOSE_TIME_MS, FONT_FAMILY } from "../constants/Layout";

export const InfoPage: React.FC<NativeStackScreenProps<RootScreenParamList, "Info">> = ({ navigation }) => {
  const animationDuration = DISCLOSE_TIME_MS;
  const rotateAnimation = new Animated.Value(0);

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
    <Background>
      <View>
        <Text style={styles.infoHeader}>Nasıl Oynanır?</Text>
        <Text style={styles.infoHeaderText}>Her tahmin oyuna başlarken seçtiğiniz 5,6 ya da 7 harfli seçeneklerden biri olmalıdır.</Text>
        <Text style={styles.infoHeaderText}>Her tahminden sonra kutucukların renkleri tahmininizin yakınlığına göre değişecektir.</Text>
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.infoRow}>
        <Text style={styles.infoSubHeader}>Örnekler</Text>
      </View>
      <View style={styles.infoRow}>
        <View style={styles.answersGroupContent}>
          <Animated.View style={[styles.answerItem, { backgroundColor: COLORS.GREEN }, { ...animatedStyle }]}>
            <Text style={styles.tStyle}>K</Text>
          </Animated.View>
          <View style={styles.answerItem}>
            <Text style={styles.tStyle}>A</Text>
          </View>
          <View style={styles.answerItem}>
            <Text style={styles.tStyle}>Ğ</Text>
          </View>
          <View style={styles.answerItem}>
            <Text style={styles.tStyle}>I</Text>
          </View>
          <View style={styles.answerItem}>
            <Text style={styles.tStyle}>T</Text>
          </View>
        </View>
        <Text style={styles.infoText}>A harfi kelimede var ve doğru yerde.</Text>
      </View>
      <View style={styles.infoRow}>
        <View style={styles.answersGroupContent}>
          <View style={styles.answerItem}>
            <Text style={styles.tStyle}>P</Text>
          </View>
          <Animated.View style={[styles.answerItem, { backgroundColor: COLORS.YELLOW }, { ...animatedStyle }]}>
            <Text style={styles.tStyle}>E</Text>
          </Animated.View>
          <View style={styles.answerItem}>
            <Text style={styles.tStyle}>N</Text>
          </View>
          <View style={styles.answerItem}>
            <Text style={styles.tStyle}>S</Text>
          </View>
          <View style={styles.answerItem}>
            <Text style={styles.tStyle}>E</Text>
          </View>
        </View>
        <Text style={styles.infoText}>E harfi kelimede var, fakat yanlış yerde.</Text>
      </View>
      <View style={styles.infoRow}>
        <View style={styles.answersGroupContent}>
          <View style={styles.answerItem}>
            <Text style={styles.tStyle}>G</Text>
          </View>
          <View style={styles.answerItem}>
            <Text style={styles.tStyle}>Ö</Text>
          </View>
          <View style={styles.answerItem}>
            <Text style={styles.tStyle}>Ç</Text>
          </View>
          <Animated.View style={[styles.answerItem, { backgroundColor: COLORS.COLOR_TONE4 }, { ...animatedStyle }]}>
            <Text style={styles.tStyle}>Ü</Text>
          </Animated.View>
          <View style={styles.answerItem}>
            <Text style={styles.tStyle}>K</Text>
          </View>
        </View>
        <Text style={styles.infoText}>Ü harfi kelimede yok.</Text>
      </View>
      <View style={styles.infoButtonContent}>
        <Button text="Anladım!" backgroundColor={COLORS.DARKANDGREEN} onPress={onPressGoBack} />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  infoRow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    marginVertical: 25,
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
    borderColor: COLORS.COLOR_TONE4,
  },

  tStyle: {
    fontSize: 25,
    fontFamily: FONT_FAMILY.Black,
    color: "#fff",
  },
  infoHeader: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    paddingLeft: 15,
    marginVertical: 20,
  },
  infoSubHeader: {
    color: "#fff",
    fontSize: 20,
    fontFamily: FONT_FAMILY.Black,
  },
  infoHeaderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 15,
    marginVertical: 10,
  },
  infoText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 10,
    marginTop: 10,
  },
  horizontalLine: {
    width: "100%",
    height: 2,
    marginTop: 5,
    backgroundColor: COLORS.COLOR_TONE4,
  },
  infoButtonContent: {
    position: "absolute",
    width: "100%",
    paddingHorizontal: 20,
    bottom: 20,
  },
});
