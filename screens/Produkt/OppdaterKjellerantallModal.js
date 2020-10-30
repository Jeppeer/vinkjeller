import React, { useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  View,
  StyleSheet,
  TextInput
} from "react-native";
import { colors } from "../../styles/common";

const OppdaterKjellerantallModal = ({
  visModal,
  setVisModal,
  antallIKjeller,
  oppdaterKjellerantall
}) => {
  const [oppdatertAntall, setOppdatertAntall] = useState(antallIKjeller);

  return (
    <Modal animationType="slide" transparent={true} visible={visModal}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={styles.modal}>
          <Text style={styles.modalTekst}>
            {antallIKjeller === 0
              ? "Velg antall du vil legge i kjeller"
              : "Oppdater antall i kjeller"}
          </Text>

          <View style={{ flexDirection: "row", marginBottom: 15 }}>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? colors.primaryButtonPressed
                    : colors.primaryButton
                },
                styles.plussMinusKnapp
              ]}
              onPress={() => {
                if (oppdatertAntall > 0) {
                  setOppdatertAntall((parseInt(oppdatertAntall) - 1).toString());
                }
              }}
            >
              <Text style={{ color: "white", fontSize: 30 }}>-</Text>
            </Pressable>
            <TextInput
              style={styles.antallInput}
              value={oppdatertAntall}
              keyboardType="numeric"
              onChangeText={tekst => setOppdatertAntall(tekst)}
            />
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? colors.primaryButtonPressed
                    : colors.primaryButton
                },
                styles.plussMinusKnapp
              ]}
              onPress={() => {
                setOppdatertAntall((parseInt(oppdatertAntall) + 1).toString());
              }}
            >
              <Text style={{ color: "white", fontSize: 30 }}>+</Text>
            </Pressable>
          </View>

          <View style={styles.modalKnapper}>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? colors.primaryButtonPressed
                    : colors.primaryButton
                },
                styles.avbrytKnapp
              ]}
              onPress={() => {
                setVisModal(false);
              }}
            >
              <Text style={{ color: "white", padding: 20 }}>Avbryt</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? colors.primaryButtonPressed
                    : colors.primaryButton
                },
                styles.oppdaterAntallKnapp
              ]}
              onPress={() => {
                oppdaterKjellerantall(oppdatertAntall);
                setVisModal(false);
              }}
            >
              <Text style={{ color: "white", padding: 20 }}>
                {antallIKjeller === 0 ? "Legg i kjeller" : "Oppdater antall"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    alignItems: "center",
    margin: 60,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalTekst: {
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 18
  },
  antallInput: {
    height: 50,
    width: 50,
    fontSize: 18,
    paddingBottom: 15,
    textAlign: "center"
  },
  oppdaterAntallKnapp: {
    borderRadius: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  avbrytKnapp: {
    borderRadius: 50,
    height: 50,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  plussMinusKnapp: {
    borderRadius: 36,
    width: 36,
    height: 36,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  modalKnapper: {
    flexDirection: "row"
  }
});

export default OppdaterKjellerantallModal;
