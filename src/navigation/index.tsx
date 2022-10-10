import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParamList, RootScreenParamList } from "../types";
import NotFoundScreen from "../screens/NotFoundScreen";
import { GameScreen } from "../screens/GameScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { InfoScreen } from "../screens/InfoScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { GamePreScreen } from "../screens/GamePreScreen";
import { ThemeContextProvider } from "../theme/ThemeContext";

export default function Navigation() {
  return (
    <ThemeContextProvider>
      <AppNavigator />
    </ThemeContextProvider>
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
    <RootStackNavigator.Screen name="Home" component={HomeScreen} />
    <RootStackNavigator.Screen name="Game" component={GameScreen} options={{ animation: "fade", gestureEnabled: false }} />
    <RootStackNavigator.Screen name="GamePre" component={GamePreScreen} options={{ animation: "fade", gestureEnabled: false }} />
    <RootStackNavigator.Screen name="Info" component={InfoScreen} />
    <RootStackNavigator.Screen name="Settings" component={SettingsScreen} />
  </RootStackNavigator.Navigator>
);
