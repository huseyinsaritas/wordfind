import React from "react";
import { FullScreen } from "./FullScreen";
import { SafeArea } from "./SafeArea";

export const Background: React.FC<{ bgColor: string; topColor?: string; bottomColor?: string; children: JSX.Element | JSX.Element[] }> = ({
  bgColor,
  topColor,
  bottomColor,
  children,
}) => {
  return (
    <FullScreen bgColor={bgColor} topColor={topColor} bottomColor={bottomColor}>
      <SafeArea bgColor={bgColor}>{children}</SafeArea>
    </FullScreen>
  );
};
