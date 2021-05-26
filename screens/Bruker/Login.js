import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Knapp from "../../components/knapp/Knapp";
import firebase from "firebase";
import { Input } from "react-native-elements";
import { inputStyles } from "../../styles/common";
import Feilmelding from "../../components/Validering/Feilmelding";
import * as common from "../../styles/common";

const Login = ({ navigation }) => {
  const [epost, setEpost] = useState("");
  const [passord, setPassord] = useState("");
  const [feilmelding, setFeilmelding] = useState("");

  const loggInn = () => {
    setFeilmelding("");
    firebase
      .auth()
      .signInWithEmailAndPassword(epost, passord)
      .catch(error => {
        if (error.code === "auth/wrong-password" || "auth/user-not-found") {
          setFeilmelding("Feil brukernavn eller passord");
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
        <Knapp onPress={() => loggInn()} knappetekst="Logg inn" />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10
          }}
        >
          <Knapp
            styles={{ backgroundColor: "white" }}
            tekstStyle={{ color: "black" }}
            onPress={() => {
              setFeilmelding("");
              navigation.navigate("Signup");
            }}
            knappetekst="Registrer deg"
          />
          <Knapp
            styles={{ backgroundColor: "white" }}
            tekstStyle={{ color: "black" }}
            onPress={() => {
              setFeilmelding("");
              navigation.navigate("GlemtPassord");
            }}
            knappetekst="Glemt passord"
          />
        </View>
      </View>
    </View>
  );
};

export default Login;
