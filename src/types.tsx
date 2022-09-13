import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootScreenParamList = {
  Home: undefined;
  Game: undefined;
  Info: undefined;
};

export type AppStackParamList = {
  Root: NavigatorScreenParams<RootScreenParamList> | undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof AppStackParamList> = NativeStackScreenProps<AppStackParamList, Screen>;