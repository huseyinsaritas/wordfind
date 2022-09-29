import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

type Props = {
  size?: number;
  onPress?: () => void;
  color?: string;
};

const GoBack: React.FC<Props> = ({ size, color = "#fff", onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Icon name="chevron-back" size={size || 30} color={color} />
    </TouchableOpacity>
  );
};

export default GoBack;
