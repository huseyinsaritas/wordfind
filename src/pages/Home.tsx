import React, { useState } from "react";
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Background } from "../components/Background";
import Layout, { FONT_FAMILY } from "../constants/Layout";
import { RootScreenParamList } from "../types";
import { COLORS } from "../constants/Colors";

// import { AdBanner } from "../components/Adds/AdBanner";

export const HomePage: React.FC<NativeStackScreenProps<RootScreenParamList, "Home">> = ({ navigation }) => {
  const [length, setLength] = useState<number>();
  const onGame = () => {
    // navigation.navigate("Game");
    if (length) {
      navigation.navigate("Game", {
        length,
      });
    }
  };

  return (
    <Background>
      <Image style={styles.image} source={require("../../assets/splash.png")} />
      <View style={styles.info}>
        <TouchableOpacity style={[styles.button, length === 5 && styles.selected]} onPress={() => setLength(5)}>
          <Text style={styles.buttonText}>5 HARFLİ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, length === 6 && styles.selected]} onPress={() => setLength(6)}>
          <Text style={styles.buttonText}>6 HARFLİ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, length === 7 && styles.selected]} onPress={() => setLength(7)}>
          <Text style={styles.buttonText}>7 HARFLİ</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.start}>
        {length && (
          <TouchableOpacity style={styles.startButton} onPress={onGame}>
            <View style={styles.startButton}>
              <Text style={styles.startButtonText}>OYUNA BAŞLA</Text>
            </View>
          </TouchableOpacity>
        )}
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
    borderColor: COLORS.GRAY,
    color: COLORS.WHITE,
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
    color: COLORS.GREEN_SUPER_LIGHT,
    fontFamily: FONT_FAMILY.Black,
  },
  selected: {
    backgroundColor: COLORS.GRAY,
    borderColor: COLORS.GREEN_SUPER_LIGHT,
  },
  startButton: {},
  startButtonText: {
    fontSize: 20,
    fontFamily: FONT_FAMILY.Black,
    color: "white",
  },
});
