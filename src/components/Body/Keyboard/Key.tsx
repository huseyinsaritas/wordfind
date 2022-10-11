import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Animated, Easing, Dimensions } from "react-native";
import { COLORS } from "../../../constants/Colors";
import { DISCLOSE_TIME_MS, FONT_FAMILY } from "../../../constants/Layout";
import { getColor } from "../../../util";
import Icon from "@expo/vector-icons/Feather";
import { useGlobalState } from "../../../global/globalState";
import { useTheme } from "../../../hooks/useTheme";

type Props = {
  val: string;
  color?: string;
  isBorder?: boolean;
  onPress: () => void;
  disabled?: boolean;
  answer: string[];
};

export const Key: React.FC<Props> = ({ val, color, isBorder, onPress, disabled, answer }) => {
  const currentColor = COLORS.COMMON.COLOR_TONE2;
  const [keyBgColor, setKeyBgColor] = useState<string>(currentColor);
  const { state } = useGlobalState();
  const { theme } = useTheme();
  if (val === "") return <View style={styles.key} />;

  // const keyBorderColor = getColor(borderColor);
  const opacityAnimation = new Animated.Value(0);

  useEffect(() => {
    const keyColor = getColor(color);
    const interval = setInterval(() => {
      if (keyColor) {
        setKeyBgColor(keyColor);
      }
    }, DISCLOSE_TIME_MS * answer.length - 500);

    return () => {
      clearInterval(interval);
    };
  }, [color]);

  useEffect(() => {
    opacityAnimate();
  }, [isBorder]);

  const opacityAnimate = () => {
    Animated.timing(opacityAnimation, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      opacityAnimation.setValue(1);
    });
  };

  const opacity = opacityAnimation.interpolate({
    inputRange: [0, 0.25, 0.5, 1],
    outputRange: [0, 1, 0, 1],
  });

  const animatedStyle = {
    backgroundColor: keyBgColor,
    borderWidth: isBorder ? 2 : 0,
    borderTopColor: isBorder ? theme.colors.border : currentColor,
    borderBottomColor: isBorder ? theme.colors.border : currentColor,
    borderLeftColor: isBorder ? theme.colors.border : currentColor,
    borderRightColor: isBorder ? theme.colors.border : currentColor,
    opacity: isBorder ? opacity : 1,
    minWidth: state.lan === "en" ? Dimensions.get("window").width / 11 : Dimensions.get("window").width / 12,
  };

  const viewStyle = [styles.key, { ...animatedStyle }];

  return (
    <TouchableOpacity delayPressIn={0} disabled={disabled} onPress={onPress}>
      <Animated.View style={viewStyle}>
        <Text style={styles.font}>{val}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  key: {
    // width: Dimensions.get("window").width / 12,
    height: 55,
    padding: 3,
    marginHorizontal: Dimensions.get("window").width / 300,
    marginVertical: 3,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    // borderWidth: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.COMMON.COLOR_TONE2,
    color: COLORS.COMMON.COLOR_TONE1,
    // borderColor: COLORS.COMMON.COLOR_TONE4,
  },
  font: {
    fontSize: 25,
    includeFontPadding: false,
    color: "#fff",
    fontFamily: FONT_FAMILY.Black,
  },
});
