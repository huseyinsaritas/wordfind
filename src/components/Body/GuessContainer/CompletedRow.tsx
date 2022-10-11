import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { MayRow } from "../../../model/GameData";
import { IRowItemColor } from "../../../model/RowItemColor";
// import { getRowColors } from "../../../util";
import { RowItem } from "./RowItem";

type Props = {
  /* answer: string[]; */
  may: MayRow;
  border: boolean;
};

export const CompletedRow: React.FC<Props> = ({ /* answer, */ may, border }) => {
  // const mayChar = may.chars.map((c) => c.char);
  // const colors = getRowColors(answer, mayChar);

  // const colors: IRowItemColor[] = [];
  // may.chars.forEach((x) => {
  //   colors.push(x.state === 2 ? "green" : x.state === 1 ? "yellow" : "gray");
  // });

  const { themeType } = useTheme();

  return (
    <View style={styles.answersGroupWrapper}>
      <View style={styles.answersGroupContent}>
        {may.chars.map((r, i) => {
          const color = r.state === 2 ? "green" : r.state === 1 ? "yellow" : "darkgray";
          return <RowItem val={r.char} color={color} key={i} id={i} animation border={border} lightTheme={themeType === "light"} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  answersGroupWrapper: {
    width: "100%",
  },
  answersGroupContent: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});
