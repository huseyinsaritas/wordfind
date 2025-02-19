import React, { useEffect } from "react";
import { StyleSheet, View, Animated, Easing } from "react-native";
import { RowItem } from "./RowItem";

type Props = {
  may: string[];
  answer: string[];
  shake: boolean;
  border: boolean;
};

export const CurrentRow: React.FC<Props> = ({ may, answer, shake, border }) => {
  const emptyItems = Array.from(Array(answer.length - may.length));
  const shakeAnimation = new Animated.Value(0);

  const startShake = () => {
    Animated.timing(shakeAnimation, {
      toValue: 3,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      shakeAnimation.setValue(0);
    });
  };

  useEffect(() => {
    if (shake === true) {
      startShake();
    }
  }, [shake]);

  const interpolateRotating = shakeAnimation.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
    outputRange: [0, -5, 5, -5, 5, -5, 0],
  });

  const animatedStyle = {
    transform: [
      {
        translateX: interpolateRotating,
      },
    ],
  };

  return (
    <View style={styles.answersGroupContent}>
      <Animated.View style={[styles.answersGroupContent, { ...animatedStyle }]}>
        {may &&
          may.length > 0 &&
          may?.map((r, i) => {
            return <RowItem border={border} val={r} key={i} />;
          })}
        {emptyItems.map((_, i) => (
          <RowItem key={i} border={border} />
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  answersGroupWrapper: {
    width: "100%",
  },
  answersGroupContent: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});
