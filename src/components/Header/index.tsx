import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { COLORS } from "../../constants/Colors";
import { AdBanner } from "../Adds/AdBanner";
import GoBack from "../Base/IconButtons/GoBack";
import { HeaderContainer } from "./HeaderContainer";
// import { StatisticsButton } from "../Base/IconButtons/StatisticsButton";
import { Clue } from "./Clue";
import { useTheme } from "../../hooks/useTheme";
import { BannerAdSize } from "react-native-google-mobile-ads";

type Props = {
  onPressGoBack: () => void;
  onPressClue: () => void;
  remainingClue: number;
  gameFinished: boolean;
  // onPressNewGame: () => void;
};

export const Header: React.FC<Props> = ({ onPressGoBack, onPressClue, remainingClue, gameFinished /*, onPressNewGame*/ }) => {
  const { theme } = useTheme();
  return (
    <>
      <HeaderContainer>
        <GoBack onPress={onPressGoBack} size={30} color={theme.colors.text} />
        {/* <View style={styles.newGame}>
          <NewGame onPress={onPressNewGame} />
        </View> */}
        {/* <View style={styles.rightButtons}> */}
        <Clue gameFinished={gameFinished} remainingClue={remainingClue} onPressClue={onPressClue} />
        {/* <ClueButton onPress={onPressStatistics} color={COLORS.COMMON.YELLOW} size={25} /> */}
        {/* <StatisticsButton onPress={() => {}} size={30} /> */}

        {/* </View> */}
      </HeaderContainer>
      <View style={styles.horizontalLine} />
      <View style={styles.banner}>
        {/* <AdBanner size={Dimensions.get("window").height <= 820 ? BannerAdSize.INLINE_ADAPTIVE_BANNER : BannerAdSize.LARGE_BANNER} /> */}
        <AdBanner />
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
    backgroundColor: COLORS.COMMON.COLOR_TONE4,
  },
  banner: {
    zIndex: 2,
    marginTop: 5,
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
