import React, { useState } from "react";
import { Modal, StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { FONT_FAMILY } from "../../constants/Layout";
import Icon from "@expo/vector-icons/Ionicons";
import { COLORS } from "../../constants/Colors";
import { AdRewardedInterstitial } from "../Adds/AdRewardedInterstitial";
import { useLanguage } from "../../hooks/useLanguage";

type Props = {
  onEarned: () => void;
  onClosed: () => void;
  onFailed: () => void;
  onModalClose: () => void;
  show: boolean;
};

export const AdsModal: React.FC<Props> = ({ onEarned, onClosed, onFailed, onModalClose, show }) => {
  const [showAds, setShowAds] = useState<boolean>(false);
  const { t } = useLanguage();

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
            <Icon name="close" size={30} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.header}>{t("clueModalHeader")}</Text>
            <Text style={styles.subText}>{t("clueModalText")}</Text>
          </View>
          <TouchableOpacity onPress={() => setShowAds(true)}>
            <View style={styles.buttonPlay}>
              <Icon name="play" size={20} color="#fff" />
              <Text style={styles.buttonText}>{t("watchADS")}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <AdRewardedInterstitial
        show={showAds}
        onEarned={() => {
          onEarned();
          // setShowAds(false);
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
    width: Dimensions.get("window").width - 50,
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
    color: COLORS.COMMON.COLOR_TONE1,
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
    fontSize: 14,
    marginVertical: 10,
  },

  buttonPlay: {
    height: 40,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.COMMON.GREEN_SUPER_LIGHT,
    backgroundColor: COLORS.COMMON.GREEN,
    color: COLORS.COMMON.COLOR_TONE1,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    color: COLORS.COMMON.GREEN_SUPER_LIGHT,
    fontFamily: FONT_FAMILY.Black,
    marginLeft: 5,
  },
});
