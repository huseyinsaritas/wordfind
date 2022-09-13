import React from "react";
import { StyleSheet, View } from "react-native";
import { Background } from "../components/Background";
import { Keyboard } from "../components/Body/Keyboard";
import { Submit } from "../components/Footer/Submit";
import { Header } from "../components/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootScreenParamList } from "../types";
import { Char } from "../model/Char";
import { GuessContainer } from "../components/Body/GuessContainer";
import { useData } from "../hooks/useData";
import { Loading } from "../components/Loading";

export const GamePage: React.FC<NativeStackScreenProps<RootScreenParamList, "Game">> = ({ navigation }) => {
  const { gameLoading, data, newGame } = useData(6);

  const onPressGoBack = () => {
    navigation.navigate("Home");
  };

  const onPressInfo = () => {
    navigation.navigate("Info");
  };

  const onPressSubmit = () => {
    console.log("Submit");
  };

  const onKeyboardPress = (char: Char) => {
    console.log("keyIndex", char);
  };

  if (gameLoading || data === undefined) return <Loading message="Oyun Yukleniyor.." />;

  return (
    <Background>
      <Header onPressGoBack={onPressGoBack} onPressInfo={onPressInfo} />
      <GuessContainer data={data} />
      <View style={styles.keyboardContent}>
        <Keyboard onPress={onKeyboardPress} />
      </View>
      <View style={styles.submitContent}>
        <Submit onPress={onPressSubmit} />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  keyboardContent: {
    marginTop: 10,
  },
  submitContent: {
    display: "flex",
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
});
