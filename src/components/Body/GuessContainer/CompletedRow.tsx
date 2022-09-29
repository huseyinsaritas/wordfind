import React from "react";
import { StyleSheet, View } from "react-native";
import { getRowColors } from "../../../util";
import { RowItem } from "./RowItem";

type Props = {
  answer: string[];
  may: string[];
};

export const CompletedRow: React.FC<Props> = ({ answer, may }) => {
  const colors = getRowColors(answer, may);

  return (
    <View style={styles.answersGroupWrapper}>
      <View style={styles.answersGroupContent}>
        {may?.map((r, i) => {
          return <RowItem val={r} color={colors[i]} key={i} id={i} animation />;
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
