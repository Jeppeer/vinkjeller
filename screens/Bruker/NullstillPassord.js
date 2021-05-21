import React from "react";
import { Text, View } from "react-native";
import * as common from "../../styles/common";
import Knapp from "../../components/knapp/Knapp";

const NullstillPassord = ({ navigation, route }) => {
  return (
    <View style={common.container.centeredContainer}>
      <View style={{ width: "80%" }}>
        <Text>
          E-post for å nullstille passordet er sendt til {route.params.epost}.
          Følg instuksjonene i e-posten for å endre passord.
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10
          }}
        >
          <Knapp
            styles={{ marginRight: 10 }}
            onPress={() => navigation.goBack()}
            knappetekst="Tilbake"
          />
          <Knapp
            onPress={() => navigation.navigate("Login")}
            knappetekst="Gå til innlogging"
          />
        </View>
      </View>
    </View>
  );
};

export default NullstillPassord;
