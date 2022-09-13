import React from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

interface IGoBack {
  width?: string;
  onPress?: () => void;
  color?: string;
}

const GoBack: React.FC<IGoBack> = ({ width = "30px", color = "#fff", onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Svg fill={color} width={width} height={width} viewBox="0 0 24 24">
        <Path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z" data-name="arrow-ios-back" />
      </Svg>
    </TouchableOpacity>
  );
};

export default GoBack;
