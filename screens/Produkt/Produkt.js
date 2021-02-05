import React, {
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
  useRef
} from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import ProduktDetalj from "./ProduktDetalj";
import { colors } from "../../styles/common";
import * as firebase from "firebase";
import { getIngredienser, getPasserTil } from "./ProduktHelper";
import OppdaterKjellerantallModal from "./OppdaterKjellerantallModal";
import Pris from "../../components/Pris";
import EksternScore from "./EksternScore";
import Knapp from "../../components/knapp/Knapp";

const SET_PRODUKT_STATE = "SET_PRODUKT_STATE";

const databaseProduktReducer = (state, action) => {
  switch (action.type) {
    case SET_PRODUKT_STATE:
      return {
        antallIKjeller: action.payload.antallIKjeller,
        drikkevindu: action.payload.drikkevindu,
        notat: action.payload.notat,
        produktRef: action.payload.produktRef,
        aarKjopt: action.payload.aarKjopt
      };
  }
};

const Produkt = ({ route, navigation }) => {
  const { produktRef } = route.params;
  const produkt = useRef(route.params.produkt);
  const [visModal, setVisModal] = useState(false);
  let firebaseRef = firebase.database().ref("kjeller");

  const [produktState, dispatch] = useReducer(databaseProduktReducer, {
    antallIKjeller: produkt.current.antallIKjeller
      ? produkt.current.antallIKjeller
      : "0",
    drikkevindu: produkt.current.drikkevindu,
    notat: produkt.current.notat ? produkt.current.notat : "",
    produktRef: produktRef,
    aarKjopt: produkt.current.aarKjopt.toString()
  });

  useEffect(() => {
    firebaseRef.on("child_changed", produktOppdatert);

    return () => {
      firebaseRef.off("child_changed", produktOppdatert);
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (produkt.current.lagtTilManuelt) {
          return (
            <Knapp
              knappetekst="Endre"
              onPress={() => {
                navigation.navigate("EksternVin", {
                  produkt: { ...produkt.current, ...produktState }
                });
              }}
              styles={{ backgroundColor: "transparent", height: 70 }}
            />
          );
        } else return null;
      }
    });
  }, [navigation, produktState]);

  const produktOppdatert = oppdatertProdukt => {
    produkt.current = oppdatertProdukt.val();
    dispatch({
      type: SET_PRODUKT_STATE,
      payload: {
        antallIKjeller: produkt.current.antallIKjeller,
        drikkevindu: produkt.current.drikkevindu,
        produktRef: oppdatertProdukt.key,
        notat: produkt.current.notat,
        aarKjopt: produkt.current.aarKjopt
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
            notat: "",
            aarKjopt: null
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
            notat: data.notat,
            aarKjopt: data.aarKjopt
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
        notat: data.notat || "",
        aarKjopt: data.aarKjopt
      };
      nyttProdukt
        .set({
          ...produkt.current,
          ...produktData,
          tidLagtTil: new Date().toString()
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
              produktRef: nyttProdukt.key,
              aarKjopt: data.aarKjopt
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
              uri: `https://bilder.vinmonopolet.no/cache/515x515-0/${produkt.current.produktId}-1.jpg`
            }}
          />
        </View>
        <View style={styles.mainInfoContainer}>
          <Text style={styles.produktNavn}>
            {produkt.current.navn}{" "}
            {produkt.current.aargang !== 0 && produkt.current.aargang}
          </Text>
          {produkt.current.region && (
            <Text style={styles.produktRegion}>
              {produkt.current.region.land && produkt.current.region.land}
              {produkt.current.region.region &&
                `, ${produkt.current.region.region}`}
              {produkt.current.region.subRegion &&
                `, ${produkt.current.region.subRegion}`}
            </Text>
          )}
          <Pris
            pris={produkt.current.pris}
            style={{
              paddingBottom: 10
            }}
          />
          <View style={styles.personligInfoContainer}>
            <View style={styles.infoBoks}>
              <Text style={{ fontWeight: "bold" }}>Antall i kjeller</Text>
              <Text style={{ textAlign: "center" }}>
                {produktState.antallIKjeller}
              </Text>
            </View>
            {produktState.antallIKjeller > 0 && (
              <View style={styles.infoBoks}>
                <Text style={{ fontWeight: "bold" }}>År kjøpt</Text>
                <Text style={{ textAlign: "center" }}>
                  {produktState.aarKjopt}
                </Text>
              </View>
            )}
            {produktState.antallIKjeller > 0 && (
              <View style={styles.infoBoks}>
                <Text style={{ fontWeight: "bold" }}>Drikkevindu</Text>
                <Text style={{ textAlign: "center" }}>
                  {produktState.drikkevindu !== undefined
                    ? `${produktState.drikkevindu.fra} - ${produktState.drikkevindu.til}`
                    : "Ikke angitt"}
                </Text>
              </View>
            )}
            {produktState.antallIKjeller > 0 && (
              <View style={styles.infoBoks}>
                <Text style={{ fontWeight: "bold" }}>Notat</Text>
                <Text style={{ textAlign: "center" }}>
                  {produktState.notat ? produktState.notat : "Ingen notater"}
                </Text>
              </View>
            )}
          </View>
          <View style={{ flexDirection: "row" }}>
            <Pressable
              onPress={() => setVisModal(true)}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? colors.primaryButtonPressed
                    : colors.primaryButton
                },
                styles.leggIKjellerKnapp,
                produktState.antallIKjeller > 0
                  ? { marginRight: 10 }
                  : { marginRight: 0 }
              ]}
            >
              <Text style={{ color: "white" }}>
                {produktState.antallIKjeller === "0"
                  ? "Legg i kjeller"
                  : "Oppdater"}
              </Text>
            </Pressable>
            {produktState.antallIKjeller > 0 && (
              <Knapp
                onPress={() => oppdaterProdukt({ antallIKjeller: "0" })}
                knappetekst="Fjern fra kjeller"
              />
            )}
          </View>
        </View>

        {!produkt.current.lagtTilManuelt && (
          <EksternScore produktId={produkt.current.produktId} />
        )}

        <View style={extededInfoStyle.container}>
          <ProduktDetalj
            detaljNavn="Varetype"
            data={produkt.current.produktType}
          />
          {produkt.current.produktId && (
            <ProduktDetalj
              detaljNavn="Varenummer"
              data={produkt.current.produktId}
            />
          )}
          {produkt.current.aargang !== 0 && (
            <ProduktDetalj detaljNavn="Årgang" data={produkt.current.aargang} />
          )}
          <ProduktDetalj
            detaljNavn="Land, distrikt, underdistrikt"
            data={
              produkt.current.region &&
              `${produkt.current.region.land}${produkt.current.region.region &&
                `, ${produkt.current.region.region}`}${produkt.current.region
                .subRegion && `, ${produkt.current.region.subRegion}`}`
            }
          />
          <ProduktDetalj
            detaljNavn="Råstoff"
            data={getIngredienser(produkt.current.raastoff)}
          />
          <ProduktDetalj
            detaljNavn="Volum"
            data={
              produkt.current.volum
                ? `${parseFloat(produkt.current.volum) * 100} cl`
                : null
            }
          />
          <ProduktDetalj
            detaljNavn="Lagringsgrad"
            data={produkt.current.lagringsgrad}
          />
          {produkt.current.anbefaltMat && (
            <ProduktDetalj
              detaljNavn="Passer til"
              data={getPasserTil(produkt.current.anbefaltMat)}
            />
          )}
          <ProduktDetalj
            detaljNavn="Produsent"
            data={produkt.current.produsent}
          />
          <ProduktDetalj
            detaljNavn="Alkoholprosent"
            data={
              produkt.current.alkoholprosent
                ? `${produkt.current.alkoholprosent}%`
                : null
            }
          />
          <ProduktDetalj detaljNavn="Smak" data={produkt.current.smak} />
          <ProduktDetalj detaljNavn="Lukt" data={produkt.current.lukt} />
          <ProduktDetalj detaljNavn="Farge" data={produkt.current.farge} />
          {produkt.current.utvalg && (
            <ProduktDetalj detaljNavn="Utvalg" data={produkt.current.utvalg} />
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
    borderBottomWidth: 0.5,
    flexWrap: "wrap"
  },
  infoBoks: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 5,
    minWidth: "40%"
  }
});

export default Produkt;
