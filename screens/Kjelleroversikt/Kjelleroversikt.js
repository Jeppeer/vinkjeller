import React, { useState, useEffect } from "react";
import { Button, FlatList, Text, View } from "react-native";
import * as firebase from "firebase";
import Kjellerelement from "./Kjellerelement";

const Kjelleroversikt = ({ navigation }) => {
  const [kjellerinnhold, setKjellerinnhold] = useState([]);
  const firebaseRef = firebase.database().ref("kjeller");

  useEffect(() => {
    firebaseRef
      .orderByChild("produktId")
      .once("value")
      .then(resultat => {
        setKjellerinnhold(Object.values(resultat.val()));
      });
  }, []);

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <FlatList
        data={kjellerinnhold}
        renderItem={item => (
          <Kjellerelement element={item.item} navigation={navigation} />
        )}
        keyExtractor={item => item.produktId}
      />
    </View>
  );
};

export default Kjelleroversikt;
