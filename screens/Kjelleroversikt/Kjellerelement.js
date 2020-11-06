import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const Kjellerelement = ({ element, navigation }) => {
  const velgElement = element => {
    navigation.navigate("Produkt", { produkt: element });
  };

  return (
    <Pressable onPress={() => velgElement(element)}>
      <View style={styles.produktContainer}>
        <View style={styles.bildeContainer}>
          <Image
            style={styles.bilde}
            source={{
              uri: `https://bilder.vinmonopolet.no/cache/515x515-0/${element.produktId}-1.jpg`
            }}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.produktType}>{element.produktType}</Text>
          <Text style={styles.produktNavn}>
            {element.navn} {element.aargang !== 0 && element.aargang}
          </Text>
          <Text style={styles.produktRegion}>
            {element.region.land}
            {element.region.region && `, ${element.region.region}`}
            {element.region.subRegion && `, ${element.region.subRegion}`}
          </Text>
          <Text style={styles.produktId}>{element.produktId}</Text>
          <Text style={styles.produktPris}>
            Kr. {Number.parseFloat(element.pris).toFixed(2)}
          </Text>
        </View>
      </View>
    </Pressable>
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

export default Kjellerelement;
