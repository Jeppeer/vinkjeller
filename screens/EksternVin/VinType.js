import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { inputStyles } from "../../styles/common";
import Knapp, { knappStyles } from "../../components/knapp/Knapp";

const VinType = ({ setValues, values }) => {
  const [valgtType, setValgtType] = useState(values.produktType);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={[inputStyles.labelStyle, inputStyles.separateLabel]}>
        Velg type
      </Text>
      <View style={styles.container}>
        <Knapp
          styles={[
            styles.typeKnapp,
            valgtType === "Rødvin" && knappStyles.selected
          ]}
          knappetekst="Rødvin"
          onPress={() => {
            setValgtType("Rødvin");
            setValues({
              ...values,
              produktType: "Rødvin"
            });
          }}
        />
        <Knapp
          styles={[
            styles.typeKnapp,
            valgtType === "Hvitvin" && knappStyles.selected
          ]}
          knappetekst="Hvitvin"
          onPress={() => {
            setValgtType("Hvitvin");
            setValues({
              ...values,
              produktType: "Hvitvin"
            });
          }}
        />
        <Knapp
          styles={[
            styles.typeKnapp,
            valgtType === "Musserende vin" && knappStyles.selected
          ]}
          knappetekst="Musserende vin"
          onPress={() => {
            setValgtType("Musserende vin");
            setValues({
              ...values,
              produktType: "Musserende vin"
            });
          }}
        />
        <Knapp
          styles={[
            styles.typeKnapp,
            valgtType === "Annet" && knappStyles.selected
          ]}
          knappetekst="Annet"
          onPress={() => {
            setValgtType("Annet");
            setValues({
              ...values,
              produktType: "Annet"
            });
          }}
        />
      </View>
    </View>
  );
};

export default VinType;

const styles = StyleSheet.create({
  typeKnapp: { marginRight: 2, marginBottom: 2 },
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
