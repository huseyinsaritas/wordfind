import React, { useState } from "react";
import { Modal, StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { FONT_FAMILY } from "../../utils/constants/Layout";
import Icon from "@expo/vector-icons/Ionicons";
import { COLORS } from "../../utils/constants/Colors";
import { AdRewarded } from "../Adds/AdRewarded";
import { useLanguage } from "../../hooks/useLanguage";
import { useGlobalState } from "../../context/globalState";

type Props = {
  onEarned: () => void;
  onClosed: () => void;
  onFailed: (err: string) => void;
  onModalClose: () => void;
  show: boolean;
};

export const AdsModal: React.FC<Props> = ({ onEarned, onClosed, onFailed, onModalClose, show }) => {
  const [showAds, setShowAds] = useState<boolean>(false);
  const { t } = useLanguage();
  const { playSound } = useGlobalState();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        onModalClose();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.buttonClose}
            onPress={() => {
              onModalClose();
            }}
          >
            <Icon name="close" size={30} color={COLORS.COMMON.WHITE} />
          </TouchableOpacity>
          <View>
            <Text style={styles.header}>{t("clueModalHeader")}</Text>
            <Text style={styles.subText}>{t("clueModalText")}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              playSound("click");
              setShowAds(true);
            }}
          >
            <View style={styles.buttonPlay}>
              <Icon name="play" size={20} color={COLORS.COMMON.WHITE} />
              <Text style={styles.buttonText}>{t("watchADS")}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <AdRewarded
        show={showAds}
        onEarned={() => {
          onEarned();
          setShowAds(false);
        }}
        onClosed={onClosed}
        onFailed={onFailed}
      />
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
    marginTop: 30,
    width: "100%",
    paddingHorizontal: 20,
  },
  modalText: {
    paddingBottom: 15,
    textAlign: "center",
    fontFamily: FONT_FAMILY.Black,
    minWidth: 150,
    color: COLORS.COMMON.WHITE,
    fontSize: 20,
  },
  header: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    marginVertical: 10,
  },
  subText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
    marginVertical: 10,
  },

  buttonPlay: {
    height: 40,
    paddingHorizontal: 12,
    marginHorizontal: 10,
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.COMMON.WHITE,
    backgroundColor: COLORS.COMMON.GREEN,
    color: COLORS.COMMON.WHITE,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    color: COLORS.COMMON.WHITE,
    fontFamily: FONT_FAMILY.Black,
    marginLeft: 5,
  },
});
