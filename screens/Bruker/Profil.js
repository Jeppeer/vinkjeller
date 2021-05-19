import React, { useState } from "react";
import { Text, View } from "react-native";
import { colors } from "../../styles/common";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Knapp from "../../components/knapp/Knapp";
import * as firebase from "firebase";
import BekreftSlettProfilModal from "./BekreftSlettProfilModal";

const Profil = () => {
  let currentUser = firebase.auth().currentUser;
  const [visModal, setVisModal] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        marginTop: 20
      }}
    >
      <MaterialCommunityIcons
        name="account-circle-outline"
        size={150}
        color={colors.primaryBg}
      />
      <View style={{ alignItems: "flex-start", marginTop: 20 }}>
        <Text style={{ marginBottom: 5 }}>Navn: {currentUser.displayName}</Text>
        <Text>E-post: {currentUser.email}</Text>
      </View>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Knapp
          styles={{ marginRight: 10, backgroundColor: colors.dangerButton }}
          onPress={() => setVisModal(true)}
          knappetekst="Slett brukerkonto"
        />
        <Knapp
          onPress={() => firebase.auth().signOut()}
          knappetekst="Logg ut"
        />
      </View>
      <BekreftSlettProfilModal visModal={visModal} setVisModal={setVisModal} />
    </View>
  );
};

export default Profil;
