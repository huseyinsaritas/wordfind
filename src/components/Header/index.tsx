import React from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../../constants/Colors";
import { AdBanner } from "../Adds/AdBanner";
import GoBack from "../Base/IconButtons/GoBack";
import { HeaderContainer } from "./HeaderContainer";
import { StatisticsButton } from "../Base/IconButtons/StatisticsButton";
import { Clue } from "./Clue";

type Props = {
  onPressGoBack: () => void;
  onPressStatistics: () => void;
  onPressNewGame: () => void;
};

export const Header: React.FC<Props> = ({ onPressGoBack, onPressStatistics, onPressNewGame }) => {
  return (
    <>
      <HeaderContainer>
        <GoBack onPress={onPressGoBack} size={30} />
        {/* <View style={styles.newGame}>
          <NewGame onPress={onPressNewGame} />
        </View> */}
        {/* <View style={styles.rightButtons}> */}
        <Clue onPressClue={onPressStatistics} />
        {/* <ClueButton onPress={onPressStatistics} color={COLORS.YELLOW} size={25} /> */}
        <StatisticsButton onPress={onPressStatistics} size={30} />
        {/* </View> */}
      </HeaderContainer>
      <View style={styles.horizontalLine} />
      <View style={styles.banner}>
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
    backgroundColor: COLORS.COLOR_TONE4,
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
