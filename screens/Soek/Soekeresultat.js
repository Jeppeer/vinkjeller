import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const Soekeresultat = props => {
  const { produkt, navigation } = props;
  return (
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
        <Text style={styles.produktPris}>
          Kr. {Number.parseFloat(produkt.prices[0].salesPrice).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  produktContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 0.5,
    height: 250
  },
  bildeContainer: {
    width: "20%",
    marginRight: 15
  },
  infoContainer: {
    width: "80%"
  },
  produktNavn: {
    fontSize: 20,
    fontWeight: "bold",
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
    fontSize: 17,
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
    height: "100%",
    width: "100%"
  }
});

export default Soekeresultat;
