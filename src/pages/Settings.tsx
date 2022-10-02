import React from "react";
import { StyleSheet, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Background } from "../components/Base/Background";
import { RootScreenParamList } from "../types";
import GoBack from "../components/Base/IconButtons/GoBack";
import { COLORS } from "../constants/Colors";

export const SettingsPage: React.FC<NativeStackScreenProps<RootScreenParamList, "Settings">> = ({ navigation }) => {
  const onPressGoBack = () => {
    navigation.goBack();
  };

  return (
    <Background>
      <GoBack onPress={onPressGoBack} size={30} />
      <Text>Settings</Text>
    </Background>
  );
};

const styles = StyleSheet.create({
  settings: {
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    top: "25%",
    zIndex: 1,
    color: COLORS.WHITE,
    fontSize: 50,
  },
});
