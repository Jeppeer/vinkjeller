import React from "react";
import { Text, View } from "react-native";
import Knapp, { knappStyles } from "../../components/knapp/Knapp";
import {filterModalStyles} from "./kjellerUtil";

const LandFilter = ({ landFilter, oppdaterLandFilter }) => {
  return (
    <View style={filterModalStyles.filterType}>
      <Text style={filterModalStyles.filterTypeText}>Land</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <Knapp
          styles={[
            filterModalStyles.filterKnapp,
            landFilter === "Italia" && knappStyles.selected
          ]}
          knappetekst="Italia"
          onPress={() => oppdaterLandFilter("Italia")}
        />
        <Knapp
          styles={[
            filterModalStyles.filterKnapp,
            landFilter === "Frankrike" && knappStyles.selected
          ]}
          knappetekst="Frankrike"
          onPress={() => oppdaterLandFilter("Frankrike")}
        />
        <Knapp
          styles={[
            filterModalStyles.filterKnapp,
            landFilter === "Portugal" && knappStyles.selected
          ]}
          knappetekst="Portugal"
          onPress={() => oppdaterLandFilter("Portugal")}
        />
        <Knapp
          styles={[
            filterModalStyles.filterKnapp,
            landFilter === "USA" && knappStyles.selected
          ]}
          knappetekst="USA"
          onPress={() => oppdaterLandFilter("USA")}
        />
        <Knapp
          styles={[
            filterModalStyles.filterKnapp,
            landFilter === "Tyskland" && knappStyles.selected
          ]}
          knappetekst="Tyskland"
          onPress={() => oppdaterLandFilter("Tyskland")}
        />
        <Knapp
          styles={[
            filterModalStyles.filterKnapp,
            landFilter === "Spania" && knappStyles.selected
          ]}
          knappetekst="Spania"
          onPress={() => oppdaterLandFilter("Spania")}
        />
        <Knapp
          styles={[
            filterModalStyles.filterKnapp,
            landFilter === "Australia" && knappStyles.selected
          ]}
          knappetekst="Australia"
          onPress={() => oppdaterLandFilter("Australia")}
        />
      </View>
    </View>
  );
};

export default LandFilter;
