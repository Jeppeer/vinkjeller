import React from "react";
import { Text, View, StyleSheet } from "react-native";

const ProduktDetalj = ({ detaljNavn, data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.detaljNavn}>{detaljNavn}:</Text>
      <Text>{data ? data : "-"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingBottom: 10
  },
  detaljNavn: {
    fontWeight: "bold"
  }
});

export default ProduktDetalj;
