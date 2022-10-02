import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Animated, Easing } from "react-native";
import { COLORS } from "../../../constants/Colors";
import { FONT_FAMILY } from "../../../constants/Layout";
import { getColor } from "../../../util";

type Props = {
  val: string;
  color?: string;
  onPress: () => void;
  gameFinished?: boolean;
};

export const Key: React.FC<Props> = ({ val, color, onPress, gameFinished }) => {
  const currentColor = COLORS.COLOR_TONE2;
  // const [keyColor, setKeyColor] = useState<string | undefined>();
  if (val === "") return <View style={styles.key} />;
  const keyColor = getColor(color);
  // const colorAnimation = new Animated.Value(0);
  // const animate = () => {
  //   Animated.timing(colorAnimation, {
  //     toValue: 1,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start(() => {
  //     // const keyColor = getColor(color);
  //     // setKeyColor(keyColor);
  //   });
  // };
  // const interpolateColor = colorAnimation.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [currentColor, keyColor || currentColor],
  // });

  const animatedStyle = {
    // backgroundColor: interpolateColor || keyColor,
    backgroundColor: keyColor ? keyColor : currentColor,
  };
  const viewStyle = [styles.key, { ...animatedStyle }];

  // useEffect(() => {
  //   animate();
  // }, []);

  return (
    <TouchableOpacity delayPressIn={0} disabled={gameFinished} onPress={onPress}>
      <Animated.View style={viewStyle}>
        <Text style={styles.font}>{val}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  key: {
    minWidth: 30,
    height: 55,
    padding: 3,
    marginHorizontal: 1,
    marginVertical: 3,
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.COLOR_TONE2,
    color: COLORS.COLOR_TONE1,
    borderColor: COLORS.COLOR_TONE4,
  },
  font: {
    fontSize: 25,
    includeFontPadding: false,
    color: "#fff",
    fontFamily: FONT_FAMILY.Black,
  },
});
