import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import * as Firebase from "firebase";

const Signup = () => {
  const [navn, setNavn] = useState("");
  const [epost, setEpost] = useState("");
  const [passord, setPassord] = useState("");

  const handleSignUp = () => {
    Firebase.auth()
      .createUserWithEmailAndPassword(epost, passord)
      .then(userCredential => {
        userCredential.user.updateProfile({ displayName: navn });
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        value={navn}
        onChangeText={navn => setNavn(navn)}
        placeholder="Navn"
      />
      <TextInput
        style={styles.inputBox}
        value={epost}
        onChangeText={epost => setEpost(epost)}
        placeholder="E-postadresse"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.inputBox}
        value={passord}
        onChangeText={passord => setPassord(passord)}
        placeholder="Passord"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  inputBox: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center"
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#FFA611",
    borderColor: "#FFA611",
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  },
  buttonSignup: {
    fontSize: 12
  }
});

export default Signup;
