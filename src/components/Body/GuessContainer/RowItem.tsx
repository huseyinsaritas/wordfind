import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { COLORS } from "../../../const";
import { IRowItem } from "../../../model/RowData";

export const RowItem: React.FC<{ rowItem?: IRowItem }> = ({ rowItem }) => {
  return (
    <View style={styles.answerItem}>
      <Text style={styles.tStyle}>{rowItem?.char}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  answerItem: {
    borderColor: COLORS.DARKGRAY,
    borderWidth: 3,
    borderRadius: 6,
    width: 45,
    height: 45,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 3,
  },

  tStyle: {
    fontWeight: "800",
    fontSize: 25,
    color: COLORS.WHITE,
  },
});
