import React from "react";
import { StyleSheet, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Background } from "../components/Background";
import { RootScreenParamList } from "../types";
import { COLORS } from "../const";
import GoBack from "../components/Header/GoBack";

export const InfoPage: React.FC<NativeStackScreenProps<RootScreenParamList, "Info">> = ({ navigation }) => {
  const onPressGoBack = () => {
    navigation.navigate("Game");
  };

  return (
    <Background>
      <GoBack onPress={onPressGoBack} width="30px" />
      <Text style={styles.info}>Info</Text>
    </Background>
  );
};

const styles = StyleSheet.create({
  info: {
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    top: "25%",
    zIndex: 1,
    color: COLORS.WHITE,
    fontSize: 50,
  },
});
