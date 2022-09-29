import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

type Props = {
  onPress?: () => void;
  size?: number;
  color?: string;
};

export const InfoButton: React.FC<Props> = ({ onPress, size, color = "#fff" }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Icon name="information-circle" size={size || 30} color={color} />
    </TouchableOpacity>
  );
};
