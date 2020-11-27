import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import Soekeresultat from "./Soekeresultat";
import * as firebase from "firebase";

const Soekeresultater = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [kjellerinnhold, setKjellerinnhold] = useState([]);

  const firebaseRef = firebase.database().ref("kjeller");

  useEffect(() => {
    function setKjeller(resultat) {
      setKjellerinnhold(resultat.val() ? Object.entries(resultat.val()) : []);
      setIsLoading(false);
    }

    firebaseRef.on("value", setKjeller);
    return () => firebaseRef.off("value", setKjeller);
  }, []);

  const getKjellerelement = item => {
    return kjellerinnhold
      .filter(kjellerElement => {
        return (
          kjellerElement[1].produktId === item.item.basic.productId &&
          kjellerElement[1].aargang === item.item.basic.vintage
        );
      })
      .flat();
  };

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      {!isLoading && (
        <FlatList
          data={route.params.soekeresultat}
          renderItem={item => {
            let produkt;
            let kjellerelement = getKjellerelement(item);
            if (kjellerelement.length > 0) {
              produkt = {
                ...item.item,
                antallIKjeller: kjellerelement[1].antallIKjeller,
                drikkevindu: kjellerelement[1].drikkevindu,
                notat: kjellerelement[1].notat,
                produktRef: kjellerelement[0]
              };
            } else {
              produkt = item.item;
            }

            return <Soekeresultat produkt={produkt} navigation={navigation} />;
          }}
          keyExtractor={item => item.basic.productId}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Ingen treff.
            </Text>
          }
        />
      )}
    </View>
  );
};

export default Soekeresultater;
