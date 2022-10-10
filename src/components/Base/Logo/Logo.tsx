import { Theme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { COLORS } from "../../../constants/Colors";
import { FONT_FAMILY } from "../../../constants/Layout";
import { useThemedStyles } from "../../../hooks/useTheme";

export const Logo = () => {
  const style = useThemedStyles(styles);

  return (
    <View>
      <View style={style.logoContent}>
        <View style={[style.logoItem, style.gray]}>
          <Text style={style.tStyle}>W</Text>
        </View>
        <View style={[style.logoItem, style.gray]}>
          <Text style={style.tStyle}>O</Text>
        </View>
        <View style={[style.logoItem, style.gray]}>
          <Text style={style.tStyle}>R</Text>
        </View>
        <View style={[style.logoItem, style.green]}>
          <Text style={[style.tStyle, style.white]}>D</Text>
        </View>
      </View>

      <View style={style.logoContent}>
        <View style={[style.logoItem, style.gray]}>
          <Text style={style.tStyle}>F</Text>
        </View>
        <View style={[style.logoItem, style.yellow]}>
          <Text style={[style.tStyle, style.white]}>I</Text>
        </View>
        <View style={[style.logoItem, style.gray]}>
          <Text style={style.tStyle}>N</Text>
        </View>
        <View style={[style.logoItem, style.green]}>
          <Text style={[style.tStyle, style.white]}>D</Text>
        </View>
      </View>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    logoContent: {
      marginTop: 20,
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    logoItem: {
      borderRadius: 6,
      width: 55,
      height: 55,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 3,
      marginVertical: 5,
    },
    gray: {
      borderWidth: 3,
      borderColor: COLORS.COMMON.COLOR_TONE2,
    },
    yellow: {
      borderWidth: 3,
      backgroundColor: COLORS.COMMON.YELLOW,
      borderColor: COLORS.COMMON.COLOR_TONE2,
    },
    green: {
      borderWidth: 3,
      backgroundColor: COLORS.COMMON.GREEN,
      borderColor: COLORS.COMMON.COLOR_TONE2,
    },
    tStyle: {
      fontSize: 25,
      fontFamily: FONT_FAMILY.Black,
      color: theme.colors.text,
    },
    white: {
      color: COLORS.COMMON.WHITE,
    },
  });
