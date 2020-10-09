import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import ProduktDetalj from "./ProduktDetalj";

const Produkt = ({ route }) => {
  const { produkt } = route.params;

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
    height: 380,
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
  }
});

export default Produkt;
