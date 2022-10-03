import React, { useMemo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { IGameData } from "../../../model/GameData";
import { BodyContainer } from "./BodyContainer";
import { CompletedRow } from "./CompletedRow";
import { CurrentRow } from "./CurrentRow";
import { EmptyRow } from "./EmptyRow";

type Props = {
  data: IGameData;
  isValid: boolean;
};

export const GuessContainer: React.FC<Props> = ({ data, isValid }) => {
  const emptyRows = data.mays.length < data.answer.length - 1 ? Array.from(Array(data.answer.length - 1 - data.mays.length)) : [];

  const completedRows = useMemo(() => {
    return data.mays.map((r, i) => {
      return <CompletedRow key={i} may={r} answer={data.answer} />;
    });
  }, [data.mays, data.answer]);

  return (
    <View style={styles.body}>
      <BodyContainer>
        {completedRows}
        {data.mays.length < data.answer.length && <CurrentRow may={data.currentMay} answer={data.answer} isValid={isValid} />}
        {emptyRows.map((_, i) => (
          <EmptyRow answer={data.answer} key={i} />
        ))}
      </BodyContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
    // paddingHorizontal: 5,
    // position: "absolute",
    // left: 0,
    // right: 0,
    // bottom: 220,
    height: Dimensions.get("window").height - 425,
    justifyContent: "center",
    // marginBottom: 10,
  },
});
