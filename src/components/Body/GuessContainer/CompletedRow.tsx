import React from "react";
import { StyleSheet, View } from "react-native";
import { MayRow } from "../../../model/GameData";
import { RowItem } from "./RowItem";

type Props = {
  may: MayRow;
  border: boolean;
};

export const CompletedRow: React.FC<Props> = ({ may, border }) => {
  return (
    <View style={styles.answersGroupWrapper}>
      <View style={styles.answersGroupContent}>
        {may.chars.map((r, i) => {
          const color = r.state === 2 ? "green" : r.state === 1 ? "yellow" : "darkgray";
          return <RowItem val={r.char} color={color} key={i} id={i} animation border={border} />;
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
