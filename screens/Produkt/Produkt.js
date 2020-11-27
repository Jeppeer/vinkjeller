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
import { getIngredienser, getPasserTil } from "./ProduktHelper";
import OppdaterKjellerantallModal from "./OppdaterKjellerantallModal";
import Pris from "../../components/Pris";
import EksternScore from "./EksternScore";

const SET_PRODUKT_STATE = "SET_PRODUKT_STATE";

const databaseProduktReducer = (state, action) => {
  switch (action.type) {
    case SET_PRODUKT_STATE:
      return {
        antallIKjeller: action.payload.antallIKjeller,
        drikkevindu: action.payload.drikkevindu,
        notat: action.payload.notat,
        produktRef: action.payload.produktRef
      };
  }
};

const Produkt = ({ route }) => {
  const { produkt, produktRef } = route.params;
  const [visModal, setVisModal] = useState(false);
  let firebaseRef = firebase.database().ref("kjeller");

  const [produktState, dispatch] = useReducer(databaseProduktReducer, {
    antallIKjeller: produkt.antallIKjeller ? produkt.antallIKjeller : 0,
    drikkevindu: produkt.drikkevindu,
    notat: produkt.notat ? produkt.notat : "",
    produktRef: produktRef
  });

  useEffect(() => {
    firebaseRef.on("child_changed", produktOppdatert);

    return () => {
      firebaseRef.off("child_changed", produktOppdatert);
    };
  }, []);

  const produktOppdatert = produkt => {
    dispatch({
      type: SET_PRODUKT_STATE,
      payload: {
        antallIKjeller: produkt.val().antallIKjeller,
        drikkevindu: produkt.val().drikkevindu,
        produktRef: produkt.key,
        notat: produkt.val().notat
      }
    });
  };

  const oppdaterProdukt = data => {
    if (produktState.produktRef) {
      if (data.antallIKjeller === "0") {
        firebase
          .database()
          .ref(`kjeller/${produktState.produktRef}`)
          .remove();
        dispatch({
          type: SET_PRODUKT_STATE,
          payload: {
            antallIKjeller: "0",
            drikkevindu: undefined,
            produktRef: null,
            notat: ""
          }
        });
      } else {
        firebase
          .database()
          .ref(`kjeller/${produktState.produktRef}`)
          .update({
            antallIKjeller: data.antallIKjeller,
            drikkevindu:
              data.drikkevindu !== undefined
                ? {
                    fra: data.drikkevindu.fra,
                    til: data.drikkevindu.til
                  }
                : null,
            notat: data.notat
          });
      }
    } else if (data.antallIKjeller !== "0") {
      const nyttProdukt = firebaseRef.push();
      let produktData = {
        antallIKjeller: data.antallIKjeller,
        drikkevindu:
          data.drikkevindu !== undefined
            ? {
                fra: data.drikkevindu.fra,
                til: data.drikkevindu.til
              }
            : null,
        notat: data.notat || ""
      };
      nyttProdukt
        .set({
          ...produkt,
          ...produktData
        })
        .then(() => {
          dispatch({
            type: SET_PRODUKT_STATE,
            payload: {
              antallIKjeller: data.antallIKjeller,
              drikkevindu:
                data.drikkevindu !== undefined
                  ? {
                      fra: data.drikkevindu.fra,
                      til: data.drikkevindu.til
                    }
                  : undefined,
              notat: data.notat || "",
              produktRef: nyttProdukt.key
            }
          });
        });
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.bildeContainer}>
          <Image
            style={styles.bilde}
            source={{
              uri: `https://bilder.vinmonopolet.no/cache/515x515-0/${produkt.produktId}-1.jpg`
            }}
          />
        </View>
        <View style={styles.mainInfoContainer}>
          <Text style={styles.produktNavn}>
            {produkt.navn} {produkt.aargang !== 0 && produkt.aargang}
          </Text>
          {produkt.region && (
            <Text style={styles.produktRegion}>
              {produkt.region.land && produkt.region.land}
              {produkt.region.region && `, ${produkt.region.region}`}
              {produkt.region.subRegion && `, ${produkt.region.subRegion}`}
            </Text>
          )}
          <Pris pris={produkt.pris} />
          <View style={styles.personligInfoContainer}>
            <View style={styles.infoBoks}>
              <Text style={{ fontWeight: "bold" }}>Antall i kjeller</Text>
              <Text>{produktState.antallIKjeller}</Text>
            </View>
            {produktState.antallIKjeller > 0 && (
              <View style={styles.infoBoks}>
                <Text style={{ fontWeight: "bold" }}>Drikkevindu</Text>
                <Text>
                  {produktState.drikkevindu !== undefined
                    ? `${produktState.drikkevindu.fra} - ${produktState.drikkevindu.til}`
                    : "Ikke angitt"}
                </Text>
              </View>
            )}
            {produktState.antallIKjeller > 0 && (
              <View style={styles.infoBoks}>
                <Text style={{ fontWeight: "bold" }}>Notat</Text>
                <Text>
                  {produktState.notat ? produktState.notat : "Ingen notater"}
                </Text>
              </View>
            )}
          </View>
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
                : "Oppdater"}
            </Text>
          </Pressable>
        </View>

        <EksternScore produktId={produkt.produktId} />

        <View style={extededInfoStyle.container}>
          <ProduktDetalj detaljNavn="Varetype" data={produkt.produktType} />
          {produkt.produktId && (
            <ProduktDetalj detaljNavn="Varenummer" data={produkt.produktId} />
          )}
          {produkt.aargang !== 0 && (
            <ProduktDetalj detaljNavn="Årgang" data={produkt.aargang} />
          )}
          <ProduktDetalj
            detaljNavn="Land, distrikt, underdistrikt"
            data={
              produkt.region &&
              `${produkt.region.land}${produkt.region.region &&
                `, ${produkt.region.region.region}`}${produkt.region
                .subRegion && `, ${produkt.region.subRegion}`}`
            }
          />
          <ProduktDetalj
            detaljNavn="Råstoff"
            data={getIngredienser(produkt.raastoff)}
          />
          <ProduktDetalj
            detaljNavn="Lagringsgrad"
            data={produkt.lagringsgrad}
          />
          {produkt.anbefaltMat && (
            <ProduktDetalj
              detaljNavn="Passer til"
              data={getPasserTil(produkt.anbefaltMat)}
            />
          )}
          {/*<ProduktDetalj*/}
          {/*  detaljNavn="Produsent"*/}
          {/*  data={produkt.logistics.manufacturerName}*/}
          {/*/>*/}
          <ProduktDetalj
            detaljNavn="Alkoholprosent"
            data={produkt.alkoholprosent ? `${produkt.alkoholprosent}%` : null}
          />
          {produkt.utvalg && (
            <ProduktDetalj detaljNavn="Utvalg" data={produkt.utvalg} />
          )}
        </View>
        <OppdaterKjellerantallModal
          visModal={visModal}
          setVisModal={setVisModal}
          produktState={produktState}
          dispatch={dispatch}
          oppdaterProdukt={oppdaterProdukt}
        />
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
    height: 315,
    marginBottom: 20
  },
  mainInfoContainer: {
    alignItems: "center",
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15
  },
  produktNavn: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 10
  },
  produktRegion: {
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
  leggIKjellerKnapp: {
    borderRadius: 50,
    height: 50,
    width: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  personligInfoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 15,
    marginBottom: 20,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5
  },
  infoBoks: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 5
  }
});

export default Produkt;
