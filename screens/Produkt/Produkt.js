import React, { useEffect, useReducer, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import ProduktDetalj from "./ProduktDetalj";
import { colors, spinner } from "../../styles/common";
import * as firebase from "firebase";
import {
  getIngredienser,
  getPasserTil,
  opprettProduktBasertPaa
} from "./ProduktHelper";
import OppdaterKjellerantallModal from "./OppdaterKjellerantallModal";

const SET_PRODUKT_STATE = "SET_PRODUKT_STATE";
const OPPDATER_KJELLERANTALL = "OPPDATER_KJELLERANTALL";
const OPPDATER_PRODUKTREF = "OPPDATER_PRODUKTREF";
const OPPDATER_DRIKKEVINDU = "OPPDATER_DRIKKEVINDU";

const databaseProduktReducer = (state, action) => {
  switch (action.type) {
    case SET_PRODUKT_STATE:
      return {
        antallIKjeller: action.payload.antallIKjeller,
        drikkevindu: action.payload.drikkevindu,
        produktRef: action.payload.produktRef
      };
    case OPPDATER_KJELLERANTALL:
      return {
        ...state,
        antallIKjeller: action.antallIKjeller
      };
    case OPPDATER_PRODUKTREF:
      return {
        ...state,
        produktRef: action.produktRef
      };
    case OPPDATER_DRIKKEVINDU:
      return {
        ...state,
        drikkevindu: {
          fra: action.drikkevinduFra,
          til: action.drikkevinduTil
        }
      };
  }
};

const Produkt = ({ route }) => {
  const { produkt } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [visModal, setVisModal] = useState(false);
  let firebaseRef = firebase.database().ref("kjeller");
  const [produktState, dispatch] = useReducer(databaseProduktReducer, {
    antallIKjeller: "0",
    drikkevinduFra: null,
    drikkevinduTil: null,
    produktRef: null
  });

  useEffect(() => {
    firebaseRef.on("child_changed", produktOppdatert);
    firebaseRef.limitToLast(1).on("child_added", produktLagtTil);
    firebaseRef
      .orderByChild("produktId")
      .equalTo(produkt.basic.productId)
      .once("value")
      .then(result => {
        if (
          result.val() &&
          Object.values(result.val())[0].aargang === produkt.basic.vintage
        ) {
          dispatch({
            type: SET_PRODUKT_STATE,
            payload: {
              antallIKjeller: Object.values(result.val())[0].antallIKjeller,
              drikkevindu: Object.values(result.val())[0].drikkevindu,
              produktRef: Object.keys(result.val())[0]
            }
          });
        }
        setIsLoading(false);
      });

    return () => {
      firebaseRef.off("child_changed", produktOppdatert);
      firebaseRef.off("child_added", produktLagtTil);
    };
  }, []);

  const produktOppdatert = produkt => {
    dispatch({
      type: OPPDATER_KJELLERANTALL,
      antallIKjeller: produkt.val().antallIKjeller
    });
  };

  const produktLagtTil = nyttProdukt => {
    if (nyttProdukt.val().produktId === produkt.basic.productId) {
      dispatch({ type: OPPDATER_PRODUKTREF, produktRef: nyttProdukt.key });
      firebaseRef
        .child(nyttProdukt.key)
        .once("value")
        .then(result => {
          dispatch({
            type: OPPDATER_KJELLERANTALL,
            antallIKjeller: result.val().antallIKjeller
          });
        });
    }
  };

  const oppdaterProdukt = data => {
    if (produktState.produktRef) {
      if (data.antallIKjeller === "0") {
        firebase
          .database()
          .ref(`kjeller/${produktState.produktRef}`)
          .remove();
        dispatch({ type: OPPDATER_PRODUKTREF, produktRef: null });
        dispatch({
          type: OPPDATER_KJELLERANTALL,
          antallIKjeller: "0"
        });
      } else {
        firebase
          .database()
          .ref(`kjeller/${produktState.produktRef}`)
          .update({
            antallIKjeller: data.antallIKjeller,
            drikkevindu: {
              fra: data.drikkevinduFra,
              til: data.drikkevinduTil
            }
          });
      }
    } else if (data.antallIKjeller !== "0") {
      const nyttProdukt = firebaseRef.push();
      nyttProdukt.set({
        ...opprettProduktBasertPaa(produkt),
        antallIKjeller: data.antallIKjeller,
        drikkevindu: {
          fra: data.drikkevinduFra,
          til: data.drikkevinduTil
        }
      });
    }
  };

  return (
    <ScrollView>
      {isLoading ? (
        <View style={spinner}>
          <ActivityIndicator color={colors.primaryButton} size="large" />
        </View>
      ) : (
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
              Antall i kjeller: {produktState.antallIKjeller}
            </Text>
            <Pressable
              onPress={() => setVisModal(true)}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? colors.primaryButtonPressed
                    : colors.primaryButton
                },
                styles.leggIKjellerKnapp
              ]}
            >
              <Text style={{ color: "white" }}>
                {produktState.antallIKjeller === "0"
                  ? "Legg i kjeller"
                  : "Oppdater antall i kjeller"}
              </Text>
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
                .region && `, ${produkt.origins.origin.region}`}${produkt
                .origins.origin.subRegion &&
                `, ${produkt.origins.origin.subRegion}`}`}
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
          <OppdaterKjellerantallModal
            visModal={visModal}
            setVisModal={setVisModal}
            produktState={produktState}
            dispatch={dispatch}
            oppdaterProdukt={oppdaterProdukt}
          />
        </View>
      )}
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
