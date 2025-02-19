import React from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

type Props = {
  size?: number;
  onPress?: () => void;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

const GoBack: React.FC<Props> = ({ size, color = "#fff", onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={style}>
      <Icon name="chevron-back" size={size || 30} color={color} />
    </TouchableOpacity>
  );
};

export default GoBack;
