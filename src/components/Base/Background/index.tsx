import React from "react";
import { LayoutChangeEvent } from "react-native";
import { FullScreen } from "./FullScreen";
import { SafeArea } from "./SafeArea";

type Props = {
  onLayout?: (event: LayoutChangeEvent) => void;
  children: JSX.Element[];
};

export const Background: React.FC<Props> = ({ onLayout, children }) => {
  return (
    <FullScreen onLayout={onLayout}>
      <SafeArea>{children}</SafeArea>
    </FullScreen>
  );
};
