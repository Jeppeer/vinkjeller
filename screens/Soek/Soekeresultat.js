import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { api } from "../../service/api";

const Soekeresultat = props => {
  const { produkt, navigation } = props;
  const [produktBilde, setProduktBilde] = useState(null);

  useEffect(() => {
    api
      .get(
        `https://bilder.vinmonopolet.no/cache/300x300-0/${produkt.basic.productId}-1.jpg`
      )
      .then(bilde => {
        setProduktBilde(bilde);
      });
  }, []);

  return (
    <View style={styles.produktKontainer}>
      <Image source={produktBilde} />
      <Text style={styles.produktType}>
        {produkt.classification.productTypeName.toUpperCase()}
      </Text>
      <Text style={styles.produktNavn}>
        {produkt.basic.productShortName} {produkt.basic.vintage}
      </Text>
      <Text style={styles.produktRegion}>
        {produkt.origins.origin.country}
        {produkt.origins.origin.region && `, ${produkt.origins.origin.region}`}
        {produkt.origins.origin.subRegion &&
          `, ${produkt.origins.origin.subRegion}`}
      </Text>
      <Text style={styles.produktId}>{produkt.basic.productId}</Text>
      <Text style={styles.produktPris}>
        Kr. {Number.parseFloat(produkt.prices[0].salesPrice).toFixed(2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  produktKontainer: {
    flex: 1,
    padding: 15,
    borderBottomWidth: 0.5
  },
  produktNavn: {
    fontSize: 20,
    fontWeight: "bold"
  },
  produktId: {
    fontSize: 15,
    color: "gray"
  },
  produktRegion: {
    fontSize: 17
  },
  produktPris: {
    fontSize: 17,
    fontWeight: "bold"
  },
  produktType: {
    fontSize: 15,
    color: "gray"
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  }
});

export default Soekeresultat;
