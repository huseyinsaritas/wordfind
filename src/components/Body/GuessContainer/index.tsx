import React from "react";
import { StyleSheet, View } from "react-native";
import { GameData } from "../../../model/GameData";
import { BodyContainer } from "./BodyContainer";
import { Row } from "./Row";

export const GuessContainer: React.FC<{ data: GameData }> = ({ data }) => {
  return (
    <View style={styles.body}>
      <BodyContainer>
        {data.rows.map((r, i) => {
          return <Row key={i} row={r} />;
        })}
      </BodyContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 5,
    paddingHorizontal: 5,
    marginBottom: 25,
  },
});
