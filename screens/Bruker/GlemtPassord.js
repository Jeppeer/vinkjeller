import React, { useState } from "react";
import { Text, View } from "react-native";
import { Input } from "react-native-elements";
import { inputStyles } from "../../styles/common";
import Feilmelding from "../../components/Validering/Feilmelding";
import * as common from "../../styles/common";
import Knapp from "../../components/knapp/Knapp";
import firebase from "firebase";

const GlemtPassord = ({ navigation }) => {
  const [epost, setEpost] = useState("");
  const [feilmelding, setFeilmelding] = useState("");

  const sendResettEpost = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(epost, null)
      .then(() => {
        navigation.navigate("NullstillPassord", { epost });
      })
      .catch(error => {
        if (error.code === "auth/invalid-email") {
          setFeilmelding("E-postadressen du oppga er ikke gyldig");
        } else if (error.code === "auth/user-not-found") {
          setFeilmelding(
            "E-postadressen du oppga er ikke registrert i systemet. Har du skrevet riktig adresse?"
          );
        }
      });
  };

  return (
    <View style={common.container.centeredContainer}>
      <View style={{ width: "80%" }}>
        <Text>
          Vennligst oppgi e-postadressen til din konto. Du vil deretter få en
          lenke for å nullstille passordet ditt tilsendt på e-post.
        </Text>
        <Input
          containerStyle={{ paddingHorizontal: 0 }}
          inputContainerStyle={[
            inputStyles.inputContainerStyle,
            { paddingLeft: 5, paddingRight: 5, marginTop: 10 }
          ]}
          placeholder="E-post"
          onChangeText={epost => {
            setFeilmelding("");
            setEpost(epost);
          }}
          value={epost}
          autoCapitalize="none"
        />
        <Feilmelding feilmelding={feilmelding} />
        <Knapp onPress={() => sendResettEpost()} knappetekst="Send e-post" />
      </View>
    </View>
  );
};

export default GlemtPassord;
