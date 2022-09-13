import React from "react";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { COLORS, FONT_FAMILY } from "../../const";

export const Submit: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.submit} onPress={() => onPress()}>
      <Text style={styles.text}>SUBMIT</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submit: {
    width: 120,
    height: 50,
    marginTop: 22,
    paddingHorizontal: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.GREEN_SUPER_LIGHT,
    backgroundColor: COLORS.ORANGE,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    /* color: COLORS.BLACK, */
    color: COLORS.GREEN_SUPER_LIGHT,
    fontFamily: FONT_FAMILY.Black,
  },
});
