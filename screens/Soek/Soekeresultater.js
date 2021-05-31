import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import Soekeresultat from "./Soekeresultat";
import * as firebase from "firebase";
import Knapp from "../../components/knapp/Knapp";
import { colors } from "../../styles/common";
import { AdMobBanner } from "expo-ads-admob";
import Constants from "expo-constants";

const Soekeresultater = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [kjellerinnhold, setKjellerinnhold] = useState([]);
  let currentUser = firebase.auth().currentUser;

  const testID = "ca-app-pub-3940256099942544/6300978111";
  const productionID = "ca-app-pub-6480465457652082/9609513439";

  const firebaseRef = firebase
    .database()
    .ref(`brukere/${currentUser.uid}/kjeller`);

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
          kjellerElement[1].produktId === item.basic.productId &&
          kjellerElement[1].aargang === item.basic.vintage
        );
      })
      .flat();
  };

  const leggTilVin = () => navigation.navigate("EksternVin");

  function renderSoekeresultater(index, item) {
    if (index === 3 || (index % 5 === 0 && index !== 0 && index !== 5)) {
      return (
        <View
          style={{
            alignItems: "center",
            borderBottomWidth: 1,
            borderColor: colors.borderColor,
            marginTop: 40,
            paddingBottom: 40
          }}
        >
          <AdMobBanner
            bannerSize="largeBanner"
            adUnitID={Constants.isDevice && !__DEV__ ? productionID : testID}
            servePersonalizedAds
          />
        </View>
      );
    } else {
      let produkt;
      let kjellerelement = getKjellerelement(item);
      if (kjellerelement.length > 0) {
        produkt = {
          ...item,
          antallIKjeller: kjellerelement[1].antallIKjeller,
          drikkevindu: kjellerelement[1].drikkevindu,
          notat: kjellerelement[1].notat,
          produktRef: kjellerelement[0]
        };
      } else {
        produkt = item;
      }

      return <Soekeresultat produkt={produkt} navigation={navigation} />;
    }
  }

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      {!isLoading && (
        <FlatList
          data={route.params.soekeresultat}
          renderItem={({ index, item }) => {
            return renderSoekeresultater(index, item);
          }}
          keyExtractor={item => item.basic.productId}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <Text style={{ marginTop: 100 }}>
                Ingen treff i Vinmonopolets sortiment.
              </Text>
              <Knapp
                onPress={leggTilVin}
                knappetekst="Legg til vin manuelt"
                styles={{ marginTop: 20 }}
              />
            </View>
          }
        />
      )}
    </View>
  );
};

export default Soekeresultater;
