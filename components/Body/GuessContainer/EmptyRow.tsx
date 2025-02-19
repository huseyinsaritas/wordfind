import React from "react";
import { StyleSheet, View } from "react-native";
import { RowItem } from "./RowItem";

type Props = {
  answer: string[];
  border: boolean;
};

export const EmptyRow: React.FC<Props> = ({ answer, border }) => {
  return (
    <View style={styles.answersGroupWrapper}>
      <View style={styles.answersGroupContent}>
        {answer.map((r, i) => {
          return <RowItem key={i} border={border} />;
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
