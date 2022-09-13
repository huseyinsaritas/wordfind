import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { COLORS, FONT_FAMILY } from "../../../const";

export const Key: React.FC<{ val: string; onPress: () => void }> = ({ val, onPress }) => {
  if (val === "") return <View style={styles.key} />;

  return (
    <TouchableOpacity style={styles.key} onPress={onPress}>
      <View style={styles.keyCenter}>
        <Text style={styles.font}>{val}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  key: {
    width: 30,
    height: 50,
    padding: 2,
    marginHorizontal: 1,
    marginVertical: 1,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.YELLOW,
    borderColor: COLORS.BLACK,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
    borderBottomWidth: 2,
    borderBottomColor: "#6E7582",
  },
  keyCenter: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    /* borderWidth: 1, */
  },
  font: {
    fontSize: 24,
    /* lineHeight: 24, */
    includeFontPadding: false,
    color: "#fff",
    fontFamily: FONT_FAMILY.Black,
  },
});
