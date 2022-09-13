import React from "react";
import { LayoutChangeEvent } from "react-native";
import { FullScreen } from "./FullScreen";
import { SafeArea } from "./SafeArea";

export const Background: React.FC<{ onLayout?: (event: LayoutChangeEvent) => void; children: JSX.Element[] }> = ({ onLayout, children }) => {
  return (
    <FullScreen onLayout={onLayout}>
      <SafeArea>{children}</SafeArea>
    </FullScreen>
  );
};
