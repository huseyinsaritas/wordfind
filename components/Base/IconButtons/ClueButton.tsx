import React from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

type Props = {
  onPress?: () => void;
  disabled: boolean;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const ClueButton: React.FC<Props> = ({ onPress, disabled = false, size, color = "#fff", style }) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} activeOpacity={0.8} style={style}>
      <Icon name="bulb-sharp" size={size || 30} color={color} />
    </TouchableOpacity>
  );
};
