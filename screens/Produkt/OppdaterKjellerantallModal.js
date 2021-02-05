import React, { useEffect, useState } from "react";
import {
  CheckBox,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { colors, inputStyles, modal } from "../../styles/common";
import PlussMinusTeller from "../../components/teller/PlussMinusTeller";
import { Input } from "react-native-elements";
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
  const [aarKjopt, setAarKjopt] = useState(produktState.aarKjopt);

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
    <Modal
      animationType="slide"
      transparent={true}
      visible={visModal}
      onRequestClose={() => setVisModal(false)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ScrollView
          style={[
            modal.modal,
            { width: "70%" },
            visDrikkevindu ? { maxHeight: "70%" } : { maxHeight: "55%" }
          ]}
          contentContainerStyle={{ alignItems: "center", padding: 20 }}
        >
          <Text style={modal.modalHeader}>Lagre vin</Text>

          <View style={{ marginBottom: 10 }}>
            <Text style={inputStyles.labelStyle}>
              Velg antall du vil legge i kjeller
            </Text>
            <PlussMinusTeller
              alignCenter
              onPressMinus={() => {
                if (oppdatertAntall > 0) {
                  setOppdatertAntall(
                    (parseInt(oppdatertAntall) - 1).toString()
                  );
                }
              }}
              onPressPluss={() =>
                setOppdatertAntall((parseInt(oppdatertAntall) + 1).toString())
              }
              inputVerdi={oppdatertAntall}
              onChangeText={tekst => setOppdatertAntall(tekst)}
            />
          </View>

          <View>
            <Input
              label="År kjøpt"
              keyboardType="numeric"
              onChangeText={aar => setAarKjopt(aar.toString())}
              value={aarKjopt}
              returnKeyType="next"
              inputContainerStyle={inputStyles.inputContainerStyle}
              inputStyle={{ textAlign: "center" }}
              labelStyle={inputStyles.labelStyle}
            />
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
                  notat: notat,
                  aarKjopt: aarKjopt
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
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    padding: 6
  }
});

export default OppdaterKjellerantallModal;
