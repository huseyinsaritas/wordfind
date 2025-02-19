import React from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";

type Props = {
  onPress?: () => void;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const StatisticsButton: React.FC<Props> = ({ onPress, size, color = "#fff", style }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={style}>
      <Icon name="bar-chart" size={size || 30} color={color} />
    </TouchableOpacity>
  );
};
