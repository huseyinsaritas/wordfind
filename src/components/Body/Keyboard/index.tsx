import React from "react";
import { StyleSheet, View } from "react-native";
import { alphabetData } from "../../../constants/keys";
import { Char } from "../../../model/Char";
import { Key } from "./Key";

export const Keyboard: React.FC<{ onPress: (char: Char) => void }> = ({ onPress }) => {
  const lines = [0, 1, 2].map((i) => alphabetData.filter((k) => k.l === i));

  return (
    <View>
      <View style={styles.keyboard}>
        {lines.map((line) => {
          return (
            <View style={styles.line}>
              {line.map((key, i) => (
                <View key={i}>
                  <Key
                    val={key.c}
                    onPress={() => {
                      onPress(key);
                    }}
                  />
                </View>
              ))}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    display: "flex",
    flexDirection: "row",
  },
});
