import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { api } from "../../service/api";

const EksternScore = ({ produktId }) => {
  const [dnScore, setDnScore] = useState(null);

  useEffect(() => {
    api
      .get(`https://www.dn.no/sok/api/wine/search?q=${produktId}`)
      .then(resultat => {
        if (resultat.data.components.length) {
          let dnProdukt;
          if (resultat.data.components[0].fields.year) {
            dnProdukt = resultat.data.components.reduce((prev, current) => {
              return prev.fields.year.value > current.fields.year.value
                ? prev
                : current;
            });
          } else {
            dnProdukt = resultat.data.components[0];
          }
          setDnScore({
            score: dnProdukt.fields.score.value,
            aar: dnProdukt.fields.year ? dnProdukt.fields.year.value : "-",
            drikkevindu: {
              fra: dnProdukt.fields.drink_from.value,
              til: dnProdukt.fields.drink_to.value
            },
            smaksnotat: dnProdukt.fields.taste_notes.value
          });
        }
      });
  }, [produktId]);

  return (
    <View style={styles.container}>
      <Text
        style={{
          alignSelf: "center",
          fontWeight: "bold",
          fontSize: 20,
          paddingBottom: 20
        }}
      >
        Vurderinger
      </Text>
      {dnScore && (
        <View style={{ borderWidth: 0.5, padding: 15 }}>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>DN</Text>
          <View style={styles.score}>
            <Text style={{ fontWeight: "bold" }}>Poeng</Text>
            <Text>{dnScore.score}</Text>
          </View>
          <View style={styles.score}>
            <Text style={{ fontWeight: "bold" }}>Årgang</Text>
            <Text>{dnScore.aar}</Text>
          </View>
          <View style={styles.score}>
            <Text style={{ fontWeight: "bold" }}>Drikkevindu</Text>
            <Text>{`${dnScore.drikkevindu.fra} - ${dnScore.drikkevindu.til}`}</Text>
          </View>
          <View style={styles.score}>
            <Text style={{ fontWeight: "bold" }}>Smaksnotat</Text>
            <Text>{dnScore.smaksnotat}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    margin: 15
  },
  score: {
    flexDirection: "column",
    paddingBottom: 5
  }
});

export default EksternScore;
