import React, { useState } from "react";
import { Modal, StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { FONT_FAMILY } from "../../constants/Layout";
import { IGameData } from "../../model/GameData";
import Icon from "@expo/vector-icons/Ionicons";
import { COLORS } from "../../constants/Colors";
import { howMayFindCharByOneRow } from "../../util";

type Props = {
  data: IGameData;
  gameWon: boolean;
};

export const GameOver: React.FC<Props> = ({ data, gameWon }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const items = Array.from(Array(data.answer.length));

  const correctAnswerIndex = data.mays.findIndex((may) => may.join("") === data.answer.join(""));

  const calcWith = (index: number): number => {
    const correctLetterNumbr = howMayFindCharByOneRow(data.answer, data.mays[index]);
    return (100 / data.answer.length) * correctLetterNumbr + 12;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.buttonClose} onPress={() => setModalVisible(!modalVisible)}>
            <Icon name="close" size={30} color={COLORS.COLOR_TONE2} />
          </TouchableOpacity>
          <View>
            <Text style={styles.modalText}>Cevap: {data.answer}</Text>
            {/* <Text style={styles.modalText}>{gameWon ? `${data.mays.length}. seferde kazandınız!` : "Kaybettiniz!"} </Text> */}
            <View style={styles.modalContent}>
              {items.map((_, i) => (
                <View key={i} style={styles.graphContainer}>
                  <View style={styles.graph}>
                    <View style={[styles.graphBar, styles.alignRight, correctAnswerIndex === i && styles.highlight, { width: `${calcWith(i)}%` }]}>
                      <Text style={styles.numGuesses}>{howMayFindCharByOneRow(data.answer, data.mays[i])}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: Dimensions.get("window").height - 550,
    backgroundColor: COLORS.COLOR_TONE6,
    borderRadius: 20,
    paddingVertical: 35,
    paddingLeft: 30,
    paddingRight: 50,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    position: "absolute",
    top: 10,
    right: 10,
    // backgroundColor: COLORS.COLOR_TONE2,
    borderRadius: 50,
    padding: 1,
  },
  modalContent: {
    marginTop: 15,
    width: "100%",
  },
  modalText: {
    paddingBottom: 15,
    textAlign: "center",
    fontFamily: FONT_FAMILY.Black,
    fontSize: 16,
    minWidth: 150,
    color: COLORS.COLOR_TONE1,
  },
  graphContainer: {
    width: "100%",
    height: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    paddingBottom: 4,
    fontSize: 14,
    lineHeight: 20,
  },
  graph: {
    width: "100%",
    height: "100%",
    // paddingLeft: 5,
  },
  graphBar: {
    height: "100%",
    // position: "relative",
    backgroundColor: COLORS.COLOR_TONE4,
    // display: "flex",
  },
  alignRight: {
    width: "100%",
    justifyContent: "flex-end",
    paddingRight: 8,
  },
  highlight: {
    backgroundColor: COLORS.GREEN,
  },
  numGuesses: {
    fontWeight: "600",
    color: COLORS.COLOR_TONE1,
    paddingLeft: 5,
  },
});
