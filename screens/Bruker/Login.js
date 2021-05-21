import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Knapp from "../../components/knapp/Knapp";
import firebase from "firebase";
import { Input } from "react-native-elements";
import { inputStyles } from "../../styles/common";
import Feilmelding from "../../components/Validering/Feilmelding";

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
    <View style={styles.container}>
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
        <Knapp
          onPress={() => loggInn()}
          knappetekst="Logg inn"
          styles={{ maxWidth: "100%" }}
        />
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
            onPress={() => navigation.navigate("Signup")}
            knappetekst="Registrer deg"
          />
          <Knapp
            styles={{ backgroundColor: "white" }}
            tekstStyle={{ color: "black" }}
            onPress={() => navigation.navigate("Signup")}
            knappetekst="Glemt passord"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
});

export default Login;
