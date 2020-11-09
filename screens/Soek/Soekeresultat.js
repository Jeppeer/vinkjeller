import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Pris from "../../components/Pris";
import { colors } from "../../styles/common";
import { opprettProduktBasertPaa } from "../Produkt/ProduktHelper";

const Soekeresultat = ({ produkt, navigation }) => {
  const velgProdukt = produkt => {
    navigation.navigate("Produkt", {
      produkt: opprettProduktBasertPaa(produkt)
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
            {produkt.classification.productTypeName.toUpperCase()}
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
          <Text style={styles.produktId}>{produkt.basic.productId}</Text>
          <Pris pris={produkt.prices[0].salesPrice} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  produktContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: colors.borderColor
  },
  bildeContainer: {
    width: "20%",
    marginRight: 15
  },
  infoContainer: {
    width: "80%"
  },
  produktNavn: {
    fontSize: 18,
    paddingBottom: 10
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
