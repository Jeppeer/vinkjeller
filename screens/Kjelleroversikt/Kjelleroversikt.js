import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import * as firebase from "firebase";
import Kjellerelement from "./Kjellerelement";
import { colors, spinner } from "../../styles/common";

const Kjelleroversikt = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [kjellerinnhold, setKjellerinnhold] = useState([]);
  const [filtrertKjellerinnhold, setFiltrertKjellerinnhold] = useState([]);
  const [produktFilter, setProduktFilter] = useState(null);
  const firebaseRef = firebase.database().ref("kjeller");

  useEffect(() => {
    // TODO: Det må legges til slik at listen oppdateres når noe legges til

    firebaseRef
      .orderByChild("produktId")
      .once("value")
      .then(resultat => {
        setKjellerinnhold(Object.values(resultat.val()));
        setFiltrertKjellerinnhold(Object.values(resultat.val()));
        setIsLoading(false);
      });
    return () => setKjellerinnhold([]);
  }, []);

  useEffect(() => {
    setFiltrertKjellerinnhold(
      kjellerinnhold.filter(element => {
        if (produktFilter === "Annet") {
          return (
            element.produktType !== "Rødvin" &&
            element.produktType !== "Hvitvin" &&
            element.produktType !== "Musserende vin"
          );
        } else if (produktFilter) {
          return element.produktType === produktFilter;
        } else {
          return true;
        }
      })
    );
  }, [produktFilter]);

  const setFilter = filter => {
    filter === produktFilter
      ? setProduktFilter(null)
      : setProduktFilter(filter);
  };

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
          <View style={styles.filterContainer}>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor:
                    produktFilter === "Rødvin"
                      ? colors.primaryButtonPressed
                      : colors.primaryButton
                },
                styles.filterButton
              ]}
              onPress={() => setFilter("Rødvin")}
            >
              <Text style={styles.knappTekst}>Rødvin</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor:
                    produktFilter === "Musserende vin"
                      ? colors.primaryButtonPressed
                      : colors.primaryButton
                },
                styles.filterButton
              ]}
              onPress={() => setFilter("Musserende vin")}
            >
              <Text style={styles.knappTekst}>Musserende</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor:
                    produktFilter === "Hvitvin"
                      ? colors.primaryButtonPressed
                      : colors.primaryButton
                },
                styles.filterButton
              ]}
              onPress={() => setFilter("Hvitvin")}
            >
              <Text style={styles.knappTekst}>Hvitvin</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor:
                    produktFilter === "Annet"
                      ? colors.primaryButtonPressed
                      : colors.primaryButton
                },
                styles.filterButton
              ]}
              onPress={() => setFilter("Annet")}
            >
              <Text style={styles.knappTekst}>Annet</Text>
            </Pressable>
          </View>
          <FlatList
            data={filtrertKjellerinnhold}
            ListEmptyComponent={
              <Text style={{ textAlign: "center", marginTop: 20 }}>
                Ingen elementer med valgt filter
              </Text>
            }
            renderItem={item => (
              <Kjellerelement element={item.item} navigation={navigation} />
            )}
            keyExtractor={item => item.produktId}
          />
        </View>
      )}
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
  knappTekst: { color: "white", padding: 20 }
});

export default Kjelleroversikt;
