import React, { useState } from "react";
import { Modal, Text, View } from "react-native";
import { colors, inputStyles, modal } from "../../styles/common";
import { Input } from "react-native-elements";
import Knapp from "../../components/knapp/Knapp";
import * as firebase from "firebase";

const BekreftSlettProfilModal = ({ visModal, setVisModal }) => {
  const [passord, setPassord] = useState("");
  const [feilmelding, setFeilmelding] = useState("");
  let currentUser = firebase.auth().currentUser;

  const bekreftSlettProfil = passord => {
    currentUser
      .reauthenticateWithCredential(
        firebase.auth.EmailAuthProvider.credential(currentUser.email, passord)
      )
      .then(() => {
        currentUser.delete().catch(error => {
          setFeilmelding("Kunne ikke slette brukerkonto. Prøv igjen senere.");
        });
      })
      .catch(error => {
        setFeilmelding("Ugyldig passord.");
      });
  };

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
        <View
          style={[
            modal.modal,
            {
              padding: 20,
              justifyContent: "center",
              alignItems: "center"
            }
          ]}
        >
          <Text style={modal.modalHeader}>Bekreft sletting</Text>
          <Text style={{ textAlign: "center" }}>
            Oppgi passordet ditt for å slette brukerkontoen din. Denne
            handlingen kan ikke angres.
          </Text>
          <Input
            onChangeText={passord => setPassord(passord)}
            placeholder="Passord"
            secureTextEntry={true}
            value={passord}
            inputContainerStyle={[
              inputStyles.inputContainerStyle,
              { width: "90%", marginTop: 10, marginBottom: -20 }
            ]}
          />
          {feilmelding !== "" && (
            <Text style={{ color: colors.dangerButton, marginBottom: 10 }}>
              {feilmelding}
            </Text>
          )}
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Knapp
              styles={{ marginRight: 10, backgroundColor: colors.dangerButton }}
              onPress={() => bekreftSlettProfil(passord)}
              knappetekst="Slett"
            />
            <Knapp
              onPress={() => {
                setVisModal(false);
                setPassord("");
                setFeilmelding("");
              }}
              knappetekst="Avbryt"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BekreftSlettProfilModal;
