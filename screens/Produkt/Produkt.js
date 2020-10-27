import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import ProduktDetalj from "./ProduktDetalj";
import { colors } from "../../styles/common";
import * as firebase from "firebase";
import { opprettProduktBasertPaa } from "./ProduktHelper";

const Produkt = ({ route }) => {
  const { produkt } = route.params;
  const [antallIKjeller, setAntallIKjeller] = useState(0);
  const [produktRef, setProduktRef] = useState(null);
  let firebaseRef = firebase.database().ref("kjeller");

  useEffect(() => {
    firebaseRef.on("child_changed", produktOppdatert);
    firebaseRef
      .orderByChild("produktId")
      .equalTo(produkt.basic.productId)
      .once("value")
      .then(result => {
        if (
          result.val() &&
          Object.values(result.val())[0].aargang === produkt.basic.vintage
        ) {
          setAntallIKjeller(Object.values(result.val())[0].antallIKjeller);
          setProduktRef(Object.keys(result.val())[0]);
        }
      });

    return () => firebaseRef.off("child_changed", produktOppdatert);
  }, []);

  const produktOppdatert = produkt => {
    setAntallIKjeller(produkt.val().antallIKjeller);
  };

  const getIngredienser = ingredienser => {
    if (ingredienser.grapes.length) {
      return ingredienser.grapes
        .map(grape => `${grape.grapeDesc} ${grape.grapePct}%`)
        .join(", ");
    } else {
      return ingredienser.ingredients;
    }
  };

  const getPasserTil = anbefaltMat => {
    return anbefaltMat.map(matType => matType.foodDesc).join(", ");
  };

  const leggIKjeller = antall => {
    firebase
      .database()
      .ref(`kjeller/${produktRef}`)
      .update({ antallIKjeller: antallIKjeller + 1 });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.bildeContainer}>
          <Image
            style={styles.bilde}
            source={{
              uri: `https://bilder.vinmonopolet.no/cache/515x515-0/${produkt.basic.productId}-1.jpg`
            }}
          />
        </View>
        <View style={styles.mainInfoContainer}>
          <Text style={styles.produktNavn}>
            {produkt.basic.productShortName}{" "}
            {produkt.basic.vintage !== 0 && produkt.basic.vintage}
          </Text>
          <Text style={styles.produktRegion}>
            {produkt.origins.origin.country}
            {produkt.origins.origin.region &&
              `, ${produkt.origins.origin.region}`}
            {produkt.origins.origin.subRegion &&
              `, ${produkt.origins.origin.subRegion}`}
          </Text>
          <Text style={styles.produktPris}>
            Kr. {Number.parseFloat(produkt.prices[0].salesPrice).toFixed(2)}
          </Text>
          <Text style={styles.kjellerAntall}>
            Antall i kjeller: {antallIKjeller}
          </Text>
          <Pressable
            onPress={leggIKjeller}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? colors.primaryButtonPressed
                  : colors.primaryButton
              },
              styles.leggIKjellerKnapp
            ]}
          >
            <Text style={{ color: "white" }}>Legg i kjeller</Text>
          </Pressable>
        </View>

        <View style={extededInfoStyle.container}>
          <ProduktDetalj
            detaljNavn="Varetype"
            data={produkt.classification.productTypeName}
          />
          <ProduktDetalj
            detaljNavn="Varenummer"
            data={produkt.basic.productId}
          />
          {produkt.basic.vintage !== 0 && (
            <ProduktDetalj detaljNavn="Årgang" data={produkt.basic.vintage} />
          )}
          <ProduktDetalj
            detaljNavn="Land, distrikt, underdistrikt"
            data={`${produkt.origins.origin.country}${produkt.origins.origin
              .region && `, ${produkt.origins.origin.region}`}${produkt.origins
              .origin.subRegion && `, ${produkt.origins.origin.subRegion}`}`}
          />
          <ProduktDetalj
            detaljNavn="Råstoff"
            data={getIngredienser(produkt.ingredients)}
          />
          <ProduktDetalj
            detaljNavn="Lagringsgrad"
            data={produkt.properties.storagePotential}
          />
          <ProduktDetalj
            detaljNavn="Passer til"
            data={getPasserTil(produkt.description.recommendedFood)}
          />
          <ProduktDetalj
            detaljNavn="Produsent"
            data={produkt.logistics.manufacturerName}
          />
          <ProduktDetalj
            detaljNavn="Alkoholprosent"
            data={`${produkt.basic.alcoholContent}%`}
          />
          <ProduktDetalj
            detaljNavn="Utvalg"
            data={produkt.assortment.assortment}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const extededInfoStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 15
  },
  extendedInfoItem: {
    height: 50
  }
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 15,
    backgroundColor: "white",
    height: "100%"
  },
  bildeContainer: {
    width: "100%",
    height: 350,
    marginBottom: 20
  },
  mainInfoContainer: {
    alignItems: "center",
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15
  },
  produktNavn: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 10
  },
  produktId: {
    fontSize: 15,
    color: "gray",
    paddingBottom: 10
  },
  produktRegion: {
    fontSize: 17,
    paddingBottom: 10
  },
  produktPris: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10
  },
  produktType: {
    fontSize: 15,
    color: "gray",
    paddingBottom: 10
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  bilde: {
    resizeMode: "contain",
    height: "100%",
    width: "100%"
  },
  kjellerAntall: {
    fontSize: 17,
    paddingBottom: 20
  },
  leggIKjellerKnapp: {
    borderRadius: 50,
    height: 50,
    width: "50%",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Produkt;
