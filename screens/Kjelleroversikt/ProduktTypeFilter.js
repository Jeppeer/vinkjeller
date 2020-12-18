import React from "react";
import { Text, View } from "react-native";
import Knapp, { knappStyles } from "../../components/knapp/Knapp";
import { filterModalStyles } from "./filterUtil";

const ProduktTypeFilter = ({ produktFilter, oppdaterProduktFilter }) => {
  return (
    <View style={filterModalStyles.filterType}>
      <Text style={filterModalStyles.filterTypeText}>Produkttype</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <Knapp
          styles={[
            filterModalStyles.filterKnapp,
            produktFilter === "Rødvin" && knappStyles.selected
          ]}
          knappetekst="Rødvin"
          onPress={() => oppdaterProduktFilter("Rødvin")}
        />
        <Knapp
          styles={[
            filterModalStyles.filterKnapp,
            produktFilter === "Hvitvin" && knappStyles.selected
          ]}
          knappetekst="Hvitvin"
          onPress={() => oppdaterProduktFilter("Hvitvin")}
        />
        <Knapp
          styles={[
            filterModalStyles.filterKnapp,
            produktFilter === "Musserende vin" && knappStyles.selected
          ]}
          knappetekst="Musserende vin"
          onPress={() => oppdaterProduktFilter("Musserende vin")}
        />
        <Knapp
          styles={[
            filterModalStyles.filterKnapp,
            produktFilter === "Annet" && knappStyles.selected
          ]}
          knappetekst="Annet"
          onPress={() => oppdaterProduktFilter("Annet")}
        />
      </View>
    </View>
  );
};

export default ProduktTypeFilter;
