import * as React from "react";
import { ColorSchemeName } from "react-native";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AppStackParamList, RootScreenParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

import NotFoundScreen from "../screens/NotFoundScreen";

import { HomePage } from "../pages/Home";
import { GamePage } from "../pages/Game";
import { InfoPage } from "../pages/Info";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
}

const AppStackNavigator = createNativeStackNavigator<AppStackParamList>();
const AppNavigator = () => {
  return (
    <AppStackNavigator.Navigator>
      <AppStackNavigator.Screen name="Root" component={RootNavigator} options={{ headerShown: false }} />
      <AppStackNavigator.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
    </AppStackNavigator.Navigator>
  );
};

const RootStackNavigator = createNativeStackNavigator<RootScreenParamList>();
const RootNavigator = () => (
  <RootStackNavigator.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
    <RootStackNavigator.Screen name="Home" component={HomePage} />
    <RootStackNavigator.Screen name="Game" component={GamePage} />
    <RootStackNavigator.Screen name="Info" component={InfoPage} />
  </RootStackNavigator.Navigator>
);
