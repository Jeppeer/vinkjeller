import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Pris from "../../components/Pris";
import { colors } from "../../styles/common";
import { opprettProduktBasertPaa } from "../Produkt/ProduktHelper";

const Soekeresultat = ({ produkt, navigation }) => {
  const velgProdukt = produkt => {
    navigation.navigate("Produkt", {
      produkt: {
        ...opprettProduktBasertPaa(produkt),
        antallIKjeller: produkt.antallIKjeller ? produkt.antallIKjeller : 0,
        drikkevindu: produkt.drikkevindu,
        notat: produkt.notat ? produkt.notat : "",
        aarKjopt: produkt.aarKjopt
          ? produkt.aarKjopt
          : new Date().getFullYear().toString()
      },
      produktRef: produkt.produktRef
    });
  };

  return (
    <Pressable onPress={() => velgProdukt(produkt)}>
      <View style={styles.produktContainer}>
        <View style={styles.bildeContainer}>
          <Image
            style={styles.bilde}
            source={{
              uri: `https://bilder.vinmonopolet.no/cache/515x515-0/${produkt.basic.productId}-1.jpg`
            }}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.produktType}>
            {produkt.basic.productId} - {produkt.classification.productTypeName}
          </Text>
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
          <Pris
            pris={produkt.prices[0].salesPrice}
            style={{
              paddingBottom: 10
            }}
          />
          {produkt.antallIKjeller && (
            <Text style={{ fontWeight: "bold" }}>
              Antall i kjeller: {produkt.antallIKjeller}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  produktContainer: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
    height: 180,
    alignItems: "center"
  },
  bildeContainer: {
    width: "20%"
  },
  infoContainer: {
    width: "80%"
  },
  produktNavn: {
    fontWeight: "bold",
    paddingBottom: 5,
    paddingRight: 20
  },
  produktId: {
    color: "gray",
    paddingBottom: 10
  },
  produktRegion: {
    paddingBottom: 10
  },
  produktType: {
    color: "gray",
    paddingBottom: 10
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  bilde: {
    height: "100%",
    width: "100%",
    resizeMode: "contain"
  }
});

export default Soekeresultat;
