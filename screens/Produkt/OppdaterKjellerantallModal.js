import React, { useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  View,
  StyleSheet,
  CheckBox,
  TextInput
} from "react-native";
import { colors } from "../../styles/common";
// import CheckBox from "@react-native-community/checkbox";

const OppdaterKjellerantallModal = ({
  visModal,
  setVisModal,
  produktState,
  oppdaterProdukt
}) => {
  const [notat, setNotat] = useState(produktState.notat);
  const [oppdatertAntall, setOppdatertAntall] = useState(
    produktState.antallIKjeller.toString()
  );
  const [visDrikkevindu, setVisDrikkevindu] = useState(
    produktState.drikkevindu !== undefined
  );
  const [drikkevinduFra, setDrikkevinduFra] = useState(
    produktState.drikkevindu !== undefined ? produktState.drikkevindu.fra : null
  );
  const [drikkevinduTil, setDrikkevinduTil] = useState(
    produktState.drikkevindu !== undefined ? produktState.drikkevindu.til : null
  );

  return (
    <Modal animationType="slide" transparent={true} visible={visModal}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={styles.modal}>
          <Text style={styles.modalTekst}>
            {produktState.antallIKjeller === 0
              ? "Velg antall du vil legge i kjeller"
              : "Oppdater antall i kjeller"}
          </Text>

          <View style={{ flexDirection: "row" }}>
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
                  setOppdatertAntall(
                    (parseInt(oppdatertAntall) - 1).toString()
                  );
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

          <View>
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={visDrikkevindu}
                onValueChange={() => {
                  setVisDrikkevindu(!visDrikkevindu);
                  setDrikkevinduFra(new Date().getFullYear().toString());
                  setDrikkevinduTil(new Date().getFullYear().toString());
                }}
                style={styles.checkbox}
              />
              <Text style={styles.label}>Legg til drikkevindu?</Text>
            </View>
            {visDrikkevindu && (
              <View style={{ marginBottom: 15 }}>
                <View style={styles.drikkevinduContainer}>
                  <Text style={styles.drikkevinduLabel}>Fra</Text>
                  <View style={{ flexDirection: "row" }}>
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
                        setDrikkevinduFra(
                          (parseInt(drikkevinduFra) - 1).toString()
                        );
                      }}
                    >
                      <Text style={{ color: "white", fontSize: 30 }}>-</Text>
                    </Pressable>
                    <TextInput
                      style={styles.aarInput}
                      value={drikkevinduFra}
                      keyboardType="numeric"
                      onChangeText={tekst => setDrikkevinduFra(tekst)}
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
                        setDrikkevinduFra(
                          (parseInt(drikkevinduFra) + 1).toString()
                        );
                      }}
                    >
                      <Text style={{ color: "white", fontSize: 30 }}>+</Text>
                    </Pressable>
                  </View>
                </View>
                <View style={styles.drikkevinduContainer}>
                  <Text style={styles.drikkevinduLabel}>Til</Text>
                  <View style={{ flexDirection: "row" }}>
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
                        setDrikkevinduTil(
                          (parseInt(drikkevinduTil) - 1).toString()
                        );
                      }}
                    >
                      <Text style={{ color: "white", fontSize: 30 }}>-</Text>
                    </Pressable>
                    <TextInput
                      style={styles.aarInput}
                      value={drikkevinduTil}
                      keyboardType="numeric"
                      onChangeText={tekst => setDrikkevinduTil(tekst)}
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
                        setDrikkevinduTil(
                          (parseInt(drikkevinduTil) + 1).toString()
                        );
                      }}
                    >
                      <Text style={{ color: "white", fontSize: 30 }}>+</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            )}
          </View>

          <TextInput
            style={styles.notatInput}
            value={notat}
            onChangeText={tekst => setNotat(tekst)}
            numberOfLines={2}
            multiline
            placeholder='Skriv et notat'
          />

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
                oppdaterProdukt({
                  antallIKjeller: oppdatertAntall,
                  drikkevinduFra: visDrikkevindu ? drikkevinduFra : null,
                  drikkevinduTil: visDrikkevindu ? drikkevinduTil : null,
                  notat: notat
                });
                setVisModal(false);
              }}
            >
              <Text style={{ color: "white", padding: 20 }}>
                {produktState.antallIKjeller === 0
                  ? "Legg i kjeller"
                  : "Oppdater antall"}
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
  notatInput: {
    width: "100%",
    borderRadius: 2,
    padding: 10,
    backgroundColor: "#ebedf0",
    marginBottom: 15
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
  },
  drikkevinduContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  drikkevinduLabel: {
    marginRight: 10,
    paddingTop: 8
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20
  },
  checkbox: {
    alignSelf: "center"
  },
  label: {
    margin: 8
  },
  aarInput: {
    height: 50,
    width: 70,
    fontSize: 18,
    paddingBottom: 15,
    textAlign: "center"
  }
});

export default OppdaterKjellerantallModal;
