import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Pris from "../../components/Pris";
import { colors } from "../../styles/common";

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
          <Pris pris={element.pris} />
          <Text>Antall i kjeller: {element.antallIKjeller}</Text>
          <Text style={{ paddingBottom: 10 }}>
            Drikkevindu:{" "}
            {element.drikkevindu
              ? `${element.drikkevindu.fra} - ${element.drikkevindu.til}`
              : "Ikke angitt"}
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
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
    height: 200
  },
  bildeContainer: {
    width: "20%",
    marginRight: 15
  },
  bilde: {
    height: "100%",
    width: "100%",
    resizeMode: "contain"
  },
  infoContainer: {
    width: "80%"
  },
  produktNavn: {
    fontSize: 18,
    paddingBottom: 10
  },
  produktId: {
    fontSize: 15,
    color: "gray",
    paddingBottom: 10
  },
  produktPris: {
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
  }
});

export default Kjellerelement;
