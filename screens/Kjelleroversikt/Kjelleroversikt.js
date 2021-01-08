import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";
import * as firebase from "firebase";
import Kjellerelement from "./Kjellerelement";
import { colors, spinner } from "../../styles/common";
import LeggTilKnapp from "../../components/knapp/LeggTilKnapp";
import Knapp from "../../components/knapp/Knapp";
import FilterModal from "./FilterModal";
import { filtrer } from "./filterUtil";

const Kjelleroversikt = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [kjellerinnhold, setKjellerinnhold] = useState([]);
  const [filtrertKjellerinnhold, setFiltrertKjellerinnhold] = useState([]);
  const [visFiltrerModal, setVisFiltrerModal] = useState(false);
  const [antallAktiveFilter, setAntallAktiveFilter] = useState(0);
  const firebaseRef = firebase.database().ref("kjeller");

  const valgteFilter = useRef([]);

  useEffect(() => {
    firebaseRef.on("value", data => {
      setIsLoading(true);
      kjellerinnholdEndret(data);
    });
    return () => firebaseRef.off("value", kjellerinnholdEndret);
  }, []);

  const kjellerinnholdEndret = oppdatertKjellerinnhold => {
    setKjellerinnhold(
      oppdatertKjellerinnhold.val()
        ? Object.entries(oppdatertKjellerinnhold.val())
        : []
    );
    setFiltrertKjellerinnhold(
      oppdatertKjellerinnhold.val()
        ? filtrer(
            valgteFilter.current,
            Object.entries(oppdatertKjellerinnhold.val())
          )
        : []
    );
    setIsLoading(false);
  };

  const filtrerInnhold = filterListe => {
    valgteFilter.current = filterListe;
    let aktiveFilter = 0;
    Object.values(valgteFilter.current).forEach(
      filter => filter !== null && filter !== false && aktiveFilter++
    );
    setAntallAktiveFilter(aktiveFilter);
    setFiltrertKjellerinnhold(filtrer(filterListe, kjellerinnhold));
  };

  const leggTilVin = () => navigation.navigate("EksternVin");

  return (
    <View style={{ height: "100%" }}>
      {isLoading ? (
        <View style={spinner}>
          <ActivityIndicator color={colors.primaryButton} size="large" />
        </View>
      ) : (
        <View
          style={{
            backgroundColor: "white",
            flex: 1,
            flexDirection: "column"
          }}
        >
          <FlatList
            data={filtrertKjellerinnhold}
            ListEmptyComponent={
              <View>
                <View style={styles.filterBar}>
                  <Text style={{ fontWeight: "bold" }}>
                    Ingen treff med valgte filter
                  </Text>
                  <Knapp
                    onPress={() => setVisFiltrerModal(!visFiltrerModal)}
                    knappetekst={
                      antallAktiveFilter > 0
                        ? `Filtrér (${antallAktiveFilter})`
                        : "Filtrér"
                    }
                    styles={{ paddingRight: 25, paddingLeft: 25 }}
                  />
                </View>
              </View>
            }
            renderItem={({ item, index }) => {
              return index === 0 ? (
                <View>
                  <View style={styles.filterBar}>
                    <Text style={{ fontWeight: "bold" }}>{`${
                      filtrertKjellerinnhold.length
                    } ${
                      filtrertKjellerinnhold.length > 1
                        ? "produkter"
                        : "produkt"
                    }`}</Text>
                    <Knapp
                      onPress={() => setVisFiltrerModal(!visFiltrerModal)}
                      knappetekst={
                        antallAktiveFilter > 0
                          ? `Filtrér (${antallAktiveFilter})`
                          : "Filtrér"
                      }
                      styles={{
                        paddingRight: 25,
                        paddingLeft: 25
                      }}
                    />
                  </View>
                  <Kjellerelement
                    element={item[1]}
                    produktRef={item[0]}
                    navigation={navigation}
                  />
                </View>
              ) : (
                <Kjellerelement
                  element={item[1]}
                  produktRef={item[0]}
                  navigation={navigation}
                />
              );
            }}
            keyExtractor={item => item[0]}
          />
          <LeggTilKnapp onClick={leggTilVin} />
        </View>
      )}
      <FilterModal
        visModal={visFiltrerModal}
        setVisFiltrerModal={setVisFiltrerModal}
        filtrerInnhold={filtrerInnhold}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 5
  },
  filterButton: {
    borderRadius: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 2
  },
  knappTekst: { color: "white", padding: 20 },
  filterBar: {
    paddingRight: 20,
    paddingLeft: 20,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.backgroundColor
  }
});

export default Kjelleroversikt;
