import React from "react";
import { StyleSheet, View } from "react-native";
import { RowItem } from "./RowItem";

type Props = {
  row?: string[];
};

export const Row: React.FC<Props> = ({ row }) => {
  return (
    <View style={styles.answersGroupWrapper}>
      <View style={styles.answersGroupContent}>
        {row?.map((r, i) => {
          return <RowItem val={r} key={i} border={false} />;
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
