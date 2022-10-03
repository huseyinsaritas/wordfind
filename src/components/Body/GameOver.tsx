import React, { useState } from "react";
import { Modal, StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { FONT_FAMILY } from "../../constants/Layout";
import { IGameData } from "../../model/GameData";
import Icon from "@expo/vector-icons/Ionicons";
import { COLORS } from "../../constants/Colors";
import { howMayFindCharByOneRow } from "../../util";
import { Button } from "../Base/Button/Button";

type Props = {
  data: IGameData;
  gameWon: boolean;
  onPressHomePage: () => void;
  onPressNewGame: () => void;
};

export const GameOver: React.FC<Props> = ({ data, gameWon, onPressHomePage, onPressNewGame }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const items = Array.from(Array(data.answer.length));

  const correctAnswerIndex = data.mays.findIndex((may) => may.join("") === data.answer.join(""));

  const calcWith = (index: number): number => {
    const correctLetterNumbr = howMayFindCharByOneRow(data.answer, data.mays[index]);
    if (correctLetterNumbr === 0) {
      return 7;
    } else {
      return (100 / data.answer.length) * correctLetterNumbr;
    }
  };

  const newGameClicked = () => {
    setModalVisible(!modalVisible);
    onPressNewGame();
  };

  const homePageClicked = () => {
    setModalVisible(!modalVisible);
    onPressHomePage();
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
            <Icon name="close" size={30} color="#fff" />
          </TouchableOpacity>
          <View>
            {!gameWon && <Text style={styles.modalAnswer}>Cevap: {data.answer}</Text>}
            <View style={styles.modalContent}>
              {items.map((_, i) => (
                <View key={i} style={styles.graphContainer}>
                  <View style={styles.graph}>
                    <View style={[styles.graphBar, styles.alignRight, styles.highlight, { width: `${calcWith(i)}%` }]}>
                      <Text style={styles.numGuesses}>{howMayFindCharByOneRow(data.answer, data.mays[i])}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.modalFooter}>
              <Button text="YENI OYUN" onPress={() => newGameClicked()} backgroundColor={COLORS.DARKANDGREEN} />
              <Button text="ANA SAYFA" onPress={() => homePageClicked()} />
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
    width: Dimensions.get("window").width - 50,
    backgroundColor: COLORS.COLOR_TONE6,
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 20,
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
    top: 0,
    right: 0,
    padding: 1,
    zIndex: 500,
    backgroundColor: "red",
    width: 50,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  modalContent: {
    marginTop: 30,
    width: "100%",
    paddingHorizontal: 20,
    // paddingLeft: 10,
    // paddingRight: 40,
  },
  modalText: {
    paddingBottom: 15,
    textAlign: "center",
    fontFamily: FONT_FAMILY.Black,
    minWidth: 150,
    color: COLORS.COLOR_TONE1,
  },
  modalAnswer: {
    paddingVertical: 10,
    textAlign: "center",
    fontFamily: FONT_FAMILY.Black,
    fontSize: 16,
    color: COLORS.COLOR_TONE1,
    // borderWidth: 1,
    // borderColor: COLORS.GREEN,
    // borderRadius: 10,
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
    marginVertical: 5,
  },
  graph: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.COLOR_TONE4,
    borderRadius: 25,
  },
  graphBar: {
    height: "100%",
    backgroundColor: COLORS.COLOR_TONE4,
    borderRadius: 25,
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
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.COLOR_TONE1,
    paddingLeft: 5,
  },
  modalFooter: {
    marginTop: 30,
    width: "100%",
    paddingHorizontal: 20,
    height: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
