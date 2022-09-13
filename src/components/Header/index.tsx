import React from "react";
import GoBack from "./GoBack";
import { HeaderContainer } from "./HeaderContainer";
import { InfoButton } from "./InfoButton";
import { Score } from "./Score";

export const Header: React.FC<{ onPressGoBack: () => void; onPressInfo: () => void }> = ({ onPressGoBack, onPressInfo }) => {
  return (
    <HeaderContainer>
      <GoBack onPress={onPressGoBack} width="30px" />
      <Score totalScore={5} />
      <InfoButton onPress={onPressInfo} />
    </HeaderContainer>
  );
};
