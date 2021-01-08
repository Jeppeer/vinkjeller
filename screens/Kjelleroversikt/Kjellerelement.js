import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Pris from "../../components/Pris";
import { colors } from "../../styles/common";

const Kjellerelement = ({ element, produktRef, navigation }) => {
  const velgElement = element => {
    navigation.navigate("Produkt", {
      produkt: element,
      produktRef: produktRef
    });
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
          <Text style={styles.produktNavn}>
            {element.navn} {element.aargang !== 0 && element.aargang}
          </Text>
          <View>
            <Pris
              style={{
                paddingBottom: 5
              }}
              pris={element.pris}
            />
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <View style={styles.infoBoks}>
              <Text style={{ fontWeight: "bold" }}>Antall i kjeller</Text>
              <Text>{element.antallIKjeller}</Text>
            </View>
            <View style={styles.infoBoks}>
              <Text style={{ fontWeight: "bold" }}>År kjøpt</Text>
              <Text>{element.aarKjopt ? element.aarKjopt : "Ikke angitt"}</Text>
            </View>
            <View style={styles.infoBoks}>
              <Text style={{ fontWeight: "bold" }}>Drikkevindu</Text>
              <Text>
                {element.drikkevindu
                  ? `${element.drikkevindu.fra} - ${element.drikkevindu.til}`
                  : "Ikke angitt"}
              </Text>
            </View>
            <View style={styles.infoBoks}>
              <Text style={{ fontWeight: "bold" }}>Notat</Text>
              <Text>
                {element.notat !== "" && element.notat
                  ? element.notat
                  : "Ingen notater"}
              </Text>
            </View>
          </View>
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
  bilde: {
    height: "100%",
    width: "100%",
    resizeMode: "contain"
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
  },
  infoBoks: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    minWidth: "45%",
    maxWidth: "45%",
    paddingBottom: 5
  }
});

export default Kjellerelement;
