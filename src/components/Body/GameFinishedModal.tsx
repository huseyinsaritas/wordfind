import React, { useState } from "react";
import { Modal, StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { FONT_FAMILY } from "../../constants/Layout";
import { IGameData } from "../../model/GameData";
import Icon from "@expo/vector-icons/Ionicons";
import { COLORS } from "../../constants/Colors";
import { Button } from "../Base/Button/Button";
import { useLanguage } from "../../hooks/useLanguage";
import { useGlobalState } from "../../global/globalState";
import { secondsToTime } from "../../util";

type Props = {
  data: IGameData;
  gameWon: boolean;
  onPressHomePage: () => void;
  onPressNewGame: () => void;
  time: number;
};

export const GameFinishedModal: React.FC<Props> = ({ data, gameWon, onPressHomePage, onPressNewGame, time }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const { state } = useGlobalState();
  const { t } = useLanguage();

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
              <View>
                <Text style={styles.modalText}>{t("played")}</Text>
                <Text style={styles.modalText}>{state.playedGameCount}</Text>
              </View>
              <View>
                <Text style={styles.modalText}>{t("time")}</Text>
                <Text style={styles.modalText}>{secondsToTime(time)}</Text>
              </View>
              <View>
                <Text style={styles.modalText}>{t("won")}</Text>
                <Text style={styles.modalText}>{state.winCount}</Text>
              </View>
            </View>
            <View style={styles.modalFooter}>
              <Button text={t("newGame")} onPress={() => newGameClicked()} backgroundColor={COLORS.COMMON.DARKANDGREEN} />
              <Button text={t("mainPage")} onPress={() => homePageClicked()} />
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
    width: Dimensions.get("window").width > 350 ? 350 : 300,
    backgroundColor: COLORS.COMMON.COLOR_TONE6,
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 20,
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    width: "100%",
  },
  modalText: {
    paddingBottom: 15,
    textAlign: "center",
    fontFamily: FONT_FAMILY.Black,
    marginHorizontal: 20,
    color: COLORS.COMMON.COLOR_TONE1,
  },
  modalAnswer: {
    paddingVertical: 10,
    textAlign: "center",
    fontFamily: FONT_FAMILY.Black,
    fontSize: 16,
    color: COLORS.COMMON.COLOR_TONE1,
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
    backgroundColor: COLORS.COMMON.COLOR_TONE4,
    borderRadius: 25,
  },
  graphBar: {
    height: "100%",
    backgroundColor: COLORS.COMMON.COLOR_TONE4,
    borderRadius: 25,
  },
  alignRight: {
    width: "100%",
    justifyContent: "flex-end",
    paddingRight: 8,
  },
  highlight: {
    backgroundColor: COLORS.COMMON.GREEN,
  },
  numGuesses: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.COMMON.COLOR_TONE1,
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
