import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Animated } from "react-native";
import { DISCLOSE_TIME_MS, FONT_FAMILY } from "../../../constants/Layout";
import { IRowItemColor } from "../../../model/RowItemColor";
import { getColor } from "../../../util";
import { COLORS } from "../../../constants/Colors";

type Props = {
  val?: string;
  color?: IRowItemColor;
  id?: number;
  animation?: boolean;
};

export const RowItem: React.FC<Props> = ({ val, color, id = 0, animation = false }) => {
  const [rowColor, setRowColor] = useState<string>();
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
  };

  return (
    <Animated.View style={[styles.answerItem, { backgroundColor: rowColor }, animation && { ...animatedStyle }]}>
      <Text style={styles.tStyle}>{val}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  answerItem: {
    borderWidth: 3,
    borderRadius: 6,
    width: 45,
    height: 45,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 3,
    marginVertical: 5,
    borderColor: COLORS.COLOR_TONE4,
  },

  tStyle: {
    fontSize: 25,
    fontFamily: FONT_FAMILY.Black,
    color: "#fff",
  },
});
