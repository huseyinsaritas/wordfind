import React, { useEffect } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { IAlert } from "../../model/Alert";

type Props = {
  alertMessage?: IAlert;
  closeMs?: number;
  onClose: () => void;
};

export const Alert: React.FC<Props> = ({ alertMessage, closeMs, onClose }) => {
  useEffect(() => {
    const t: NodeJS.Timeout | undefined = setTimeout(() => {
      onClose();
    }, closeMs);

    return () => {
      if (t) clearTimeout(t);
    };
  }, []);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={alertMessage?.show}
        onRequestClose={() => {
          onClose();
        }}
      >
        <Pressable onPress={() => onClose()}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{alertMessage?.message}</Text>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
});
