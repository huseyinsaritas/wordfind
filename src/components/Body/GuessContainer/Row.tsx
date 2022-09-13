import React from "react";
import { StyleSheet, View } from "react-native";
import { IRowData } from "../../../model/RowData";
import { RowItem } from "./RowItem";

export const Row: React.FC<{ row?: IRowData }> = ({ row }) => {
  return (
    <View style={styles.answersGroupWrapper}>
      <View style={styles.answersGroupContent}>
        {row?.map((r, i) => {
          return <RowItem rowItem={r} key={i} />;
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
