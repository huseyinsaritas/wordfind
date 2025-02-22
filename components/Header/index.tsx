import React from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../../utils/constants/Colors";
import GoBack from "../Base/IconButtons/GoBack";
import { HeaderContainer } from "./HeaderContainer";
import { Clue } from "./Clue";
import { useTheme } from "../../hooks/useTheme";
import { AdBanner } from "../Adds/AdBanner";
import { BannerAdSize } from "react-native-google-mobile-ads";

type Props = {
  onPressGoBack: () => void;
  onPressClue: () => void;
  remainingClue: number;
  gameFinished: boolean;
};

export const Header: React.FC<Props> = ({ onPressGoBack, onPressClue, remainingClue, gameFinished /*, onPressNewGame*/ }) => {
  const { theme } = useTheme();
  return (
    <>
      <HeaderContainer>
        <GoBack onPress={onPressGoBack} size={30} color={theme.colors.text} />

        <Clue gameFinished={gameFinished} remainingClue={remainingClue} onPressClue={onPressClue} />
      </HeaderContainer>
      <View style={styles.horizontalLine} />
      <View style={styles.banner}>
        <AdBanner size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  newGame: {
    paddingLeft: 20,
  },
  horizontalLine: {
    width: "100%",
    height: 2,
    marginTop: 5,
    backgroundColor: COLORS.COMMON.DARKGRAY,
  },
  banner: {
    zIndex: 2,
    marginBottom: 2,
    textAlign: "center",
    alignItems: "center",
    width: "100%",
  },
  rightButtons: {
    display: "flex",
    flexDirection: "row",
  },
});
