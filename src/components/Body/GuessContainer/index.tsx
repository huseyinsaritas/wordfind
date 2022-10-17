import React, { useMemo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { IGameData } from "../../../model/GameData";
import { BodyContainer } from "./BodyContainer";
import { CompletedRow } from "./CompletedRow";
import { CurrentRow } from "./CurrentRow";
import { EmptyRow } from "./EmptyRow";

type Props = {
  data: IGameData;
  shake: boolean;
};

export const GuessContainer: React.FC<Props> = ({ data, shake }) => {
  const emptyRows = data.mays.length < data.answer.length - 1 ? Array.from(Array(data.answer.length - 1 - data.mays.length)) : [];

  const completedRows = useMemo(() => {
    return data.mays.map((r, i) => {
      return <CompletedRow key={i} may={r} border={false} />;
    });
  }, [data.mays, data.answer]);

  return (
    <View style={styles.body}>
      <BodyContainer>
        {completedRows}
        {data.mays.length < data.answer.length && <CurrentRow may={data.currentMay} answer={data.answer} shake={shake} border />}
        {emptyRows.map((_, i) => (
          <EmptyRow border answer={data.answer} key={i} />
        ))}
      </BodyContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    paddingBottom: 200,
    // height: Dimensions.get("window").width > 500 ? Dimensions.get("window").height - 390 : Dimensions.get("window").height - 460,
    justifyContent: "center",
  },
});
