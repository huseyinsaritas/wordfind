import React from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../../constants/Colors";
import { AdBanner } from "../Adds/AdBanner";
import GoBack from "./GoBack";
import { HeaderContainer } from "./HeaderContainer";
import { InfoButton } from "./InfoButton";
import { NewGame } from "./NewGame";

type Props = {
  onPressGoBack: () => void;
  onPressInfo: () => void;
  onPressNewGame: () => void;
};

export const Header: React.FC<Props> = ({ onPressGoBack, onPressInfo, onPressNewGame }) => {
  return (
    <>
      <HeaderContainer>
        <GoBack onPress={onPressGoBack} size={30} />
        <NewGame onPress={onPressNewGame} />
        <InfoButton onPress={onPressInfo} size={30} />
      </HeaderContainer>
      <View style={styles.horizontalLine} />
      <View style={styles.banner}>
        <AdBanner />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
    // borderWidth: 1,
    // borderColor: "#fff",
  },
});
