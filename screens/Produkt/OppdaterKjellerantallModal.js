import React, { useState, useEffect } from "react";
import {
  CheckBox,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { colors } from "../../styles/common";
import PlussMinusTeller from "../../components/teller/PlussMinusTeller";
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

  useEffect(() => {
    setOppdatertAntall(produktState.antallIKjeller.toString());
    setVisDrikkevindu(produktState.drikkevindu !== undefined);
    setDrikkevinduFra(
      produktState.drikkevindu !== undefined
        ? produktState.drikkevindu.fra
        : null
    );
    setDrikkevinduTil(
      produktState.drikkevindu !== undefined
        ? produktState.drikkevindu.til
        : null
    );
    setNotat(produktState.notat);
  }, [produktState]);

  return (
    <Modal animationType="slide" transparent={true} visible={visModal}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={styles.modal}>
          <Text style={styles.modalTekst}>
            {produktState.antallIKjeller === 0
              ? "Velg antall du vil legge i kjeller"
              : "Oppdater antall i kjeller"}
          </Text>

          <PlussMinusTeller
            onPressMinus={() => {
              if (oppdatertAntall > 0) {
                setOppdatertAntall((parseInt(oppdatertAntall) - 1).toString());
              }
            }}
            onPressPluss={() =>
              setOppdatertAntall((parseInt(oppdatertAntall) + 1).toString())
            }
            inputVerdi={oppdatertAntall}
            onChangeText={tekst => setOppdatertAntall(tekst)}
          />

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
                  <PlussMinusTeller
                    onPressMinus={() => {
                      setDrikkevinduFra(
                        (parseInt(drikkevinduFra) - 1).toString()
                      );
                    }}
                    onPressPluss={() => {
                      setDrikkevinduFra(
                        (parseInt(drikkevinduFra) + 1).toString()
                      );
                    }}
                    inputVerdi={drikkevinduFra}
                    onChangeText={tekst => setDrikkevinduFra(tekst)}
                    style={{ width: 70 }}
                  />
                </View>
                <View style={styles.drikkevinduContainer}>
                  <Text style={styles.drikkevinduLabel}>Til</Text>
                  <PlussMinusTeller
                    onPressMinus={() => {
                      setDrikkevinduTil(
                        (parseInt(drikkevinduTil) - 1).toString()
                      );
                    }}
                    onPressPluss={() => {
                      setDrikkevinduTil(
                        (parseInt(drikkevinduTil) + 1).toString()
                      );
                    }}
                    inputVerdi={drikkevinduTil}
                    onChangeText={tekst => setDrikkevinduTil(tekst)}
                    style={{ width: 70 }}
                  />
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
            placeholder="Skriv et notat"
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
                  drikkevindu: visDrikkevindu
                    ? {
                        fra: drikkevinduFra,
                        til: drikkevinduTil
                      }
                    : undefined,
                  notat: notat
                });
                setVisModal(false);
              }}
            >
              <Text style={{ color: "white", padding: 20 }}>
                {produktState.antallIKjeller === 0
                  ? "Legg i kjeller"
                  : "Oppdater"}
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
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 18
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
    alignItems: "center",
    justifyContent: "space-between"
  },
  drikkevinduLabel: {
    marginRight: 10
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 10
  },
  checkbox: {
    alignSelf: "center"
  },
  label: {
    margin: 8
  }
});

export default OppdaterKjellerantallModal;
