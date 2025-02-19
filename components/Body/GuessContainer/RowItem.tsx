import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Animated, Dimensions, PixelRatio, useWindowDimensions } from "react-native";
import { DISCLOSE_TIME_MS, FONT_FAMILY } from "../../../utils/constants/Layout";
import { IRowItemColor } from "../../../utils/model/RowItemColor";
import { getColor } from "../../../utils/index";
import { COLORS } from "../../../utils/constants/Colors";
import { useTheme } from "../../../hooks/useTheme";

type Props = {
  val?: string;
  color?: IRowItemColor;
  id?: number;
  animation?: boolean;
  border: boolean;
};

export const RowItem: React.FC<Props> = ({ val, color, id = 0, animation = false, border }) => {
  const { theme } = useTheme();
  const { width, height } = useWindowDimensions();
  const [rowColor, setRowColor] = useState<string>();
  const [borderColor, setBorderColor] = useState<string>(COLORS.COMMON.GRAY);
  const [charColor, setCharColor] = useState<string>(theme.colors.text);

  const itemSize = width < 400 ? width * 0.15 : width * 0.1;
  const scaleFont = (size: number) => size * PixelRatio.get();

  const animationDuration = DISCLOSE_TIME_MS;
  const rotateAnimation = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: animationDuration,
      delay: id * 500,
      useNativeDriver: true,
    }).start(() => {
      rotateAnimation.setValue(0);
      const cc = getColor(color);
      setRowColor(cc);
      if (!border) {
        setBorderColor("transparent");
      }
      if (!theme.dark && animation) {
        setCharColor(COLORS.COMMON.WHITE);
      }
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
    borderColor,
  };

  return (
    <Animated.View style={[styles.answerItem, { backgroundColor: rowColor, borderColor, width: itemSize, height: itemSize }, animation && animatedStyle]}>
      <Text style={[styles.tStyle, { color: charColor, fontSize: scaleFont(10) }]}>{val}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  answerItem: {
    borderWidth: 2,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 3,
    marginVertical: Dimensions.get("window").height / 200,
  },

  tStyle: {
    fontFamily: FONT_FAMILY.Black,
  },
});
