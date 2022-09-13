import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Background } from "../components/Background";
import Layout from "../constants/Layout";
import { RootScreenParamList } from "../types";
import { FONT_FAMILY } from "../const";
// import { AdBanner } from "../components/Adds/AdBanner";

export const HomePage: React.FC<NativeStackScreenProps<RootScreenParamList, "Home">> = ({ navigation }) => {
  const onGame = () => {
    navigation.navigate("Game");
  };

  return (
    <Background>
      <Image style={styles.image} source={require("../../assets/splash.png")} />
      <View style={styles.info}></View>
      <View style={styles.start}>
        <TouchableOpacity style={styles.startButton} onPress={onGame}>
          <View style={styles.startButton}>
            <Text style={styles.startButtonText}>COME ON</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* <AdBanner /> */}
    </Background>
  );
};

const styles = StyleSheet.create({
  image: {
    width: Layout.window.width,
    height: Layout.window.height,
    resizeMode: "cover",
    zIndex: -1,
  },
  info: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    top: "25%",
    zIndex: 1,
  },
  start: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    top: "75%",
    zIndex: 1,
  },
  startButton: {},
  startButtonText: {
    fontSize: 20,
    fontFamily: FONT_FAMILY.Black,
    color: "white",
  },
});
