import React from "react";
import { useTheme } from "../../../hooks/useTheme";

import { FullScreen } from "./FullScreen";
import { SafeArea } from "./SafeArea";

export const Background: React.FC<{ topColor?: string; bottomColor?: string; children: JSX.Element | JSX.Element[] }> = ({ topColor, bottomColor, children }) => {
  const { theme } = useTheme();

  return (
    <FullScreen bgColor={theme.colors.background} topColor={topColor} bottomColor={bottomColor}>
      <SafeArea bgColor={theme.colors.background}>{children}</SafeArea>
    </FullScreen>
  );
};
