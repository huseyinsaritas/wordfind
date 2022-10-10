import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { getRowColors } from "../../../util";
import { RowItem } from "./RowItem";

type Props = {
  answer: string[];
  may: string[];
  border: boolean;
};

export const CompletedRow: React.FC<Props> = ({ answer, may, border }) => {
  const colors = getRowColors(answer, may);
  const { themeType } = useTheme();

  return (
    <View style={styles.answersGroupWrapper}>
      <View style={styles.answersGroupContent}>
        {may?.map((r, i) => {
          return <RowItem val={r} color={colors[i]} key={i} id={i} animation border={border} lightTheme={themeType === "light"} />;
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
