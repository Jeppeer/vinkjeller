import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Firebase from "firebase";
import { Input } from "react-native-elements";
import { inputStyles } from "../../styles/common";
import Feilmelding from "../../components/Validering/Feilmelding";
import Knapp from "../../components/knapp/Knapp";
import * as common from "../../styles/common";
import TekstKnapp from "../../components/knapp/TekstKnapp";

const Signup = ({ navigation }) => {
  const [navn, setNavn] = useState("");
  const [epost, setEpost] = useState("");
  const [passord, setPassord] = useState("");
  const [feilmelding, setFeilmelding] = useState("");

  const opprettProfil = () => {
    setFeilmelding("");
    Firebase.auth()
      .createUserWithEmailAndPassword(epost, passord)
      .then(userCredential => {
        userCredential.user.updateProfile({ displayName: navn });
      })
      .catch(error => {
        if (error.code === "auth/email-already-in-use") {
          setFeilmelding("Epostadressen er registrert fra før");
        } else if (error.code === "auth/invalid-email") {
          setFeilmelding("Epostadressen du har oppgitt er ikke gyldig");
        } else if (error.code === "auth/weak-password") {
          setFeilmelding("Passordet må ha minst 6 karakterer");
        }
      });
  };

  return (
    <View style={common.container.centeredContainer}>
      <View style={{ width: "80%" }}>
        <Input
          containerStyle={{ paddingHorizontal: 0 }}
          inputContainerStyle={[
            inputStyles.inputContainerStyle,
            { paddingLeft: 5, paddingRight: 5 }
          ]}
          placeholder="Navn"
          onChangeText={navn => {
            setFeilmelding("");
            setNavn(navn);
          }}
          value={navn}
        />
        <Input
          containerStyle={{ paddingHorizontal: 0 }}
          inputContainerStyle={[
            inputStyles.inputContainerStyle,
            { paddingLeft: 5, paddingRight: 5 }
          ]}
          placeholder="E-post"
          onChangeText={epost => {
            setFeilmelding("");
            setEpost(epost);
          }}
          value={epost}
          autoCapitalize="none"
        />
        <Input
          containerStyle={{ paddingHorizontal: 0 }}
          inputContainerStyle={[
            inputStyles.inputContainerStyle,
            { paddingLeft: 5, paddingRight: 5 }
          ]}
          placeholder="Passord"
          onChangeText={passord => {
            setFeilmelding("");
            setPassord(passord);
          }}
          value={passord}
          autoCapitalize="none"
          secureTextEntry={true}
        />
        <Feilmelding feilmelding={feilmelding} />
        <Knapp onPress={() => opprettProfil()} knappetekst="Opprett profil" />
        <TekstKnapp
          knappetekst="Vilkår og personvern"
          onPress={() => navigation.navigate("Personvern")}
          styles={{ marginTop: 20, alignSelf: "center" }}
        />
      </View>
    </View>
  );
};

export default Signup;
