import React, { useState } from "react";
import { Modal, Text, TouchableWithoutFeedback, View } from "react-native";
import { modal } from "../../styles/common";
import Knapp from "../../components/knapp/Knapp";
import ProduktTypeFilter from "./ProduktTypeFilter";
import LandFilter from "./LandFilter";
import { filterModalStyles } from "./kjellerUtil";
import Checkbox from "../../components/checkbox/Checkbox";

const FilterModal = ({ visModal, setVisFiltrerModal, filtrerInnhold }) => {
  const [produktFilter, setProduktFilter] = useState(null);
  const [landFilter, setLandFilter] = useState(null);
  const [innenforDrikkevindu, setInnenforDrikkevindu] = useState(false);

  const oppdaterProduktFilter = filter =>
    filter === produktFilter
      ? setProduktFilter(null)
      : setProduktFilter(filter);

  const oppdaterLandFilter = filter => {
    filter === landFilter ? setLandFilter(null) : setLandFilter(filter);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visModal}
      propagateSwipe={true}
      onRequestClose={() => setVisFiltrerModal(false)}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          setVisFiltrerModal(false);
        }}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={[modal.modal, { padding: 20 }]}>
            <View style={{ width: "100%" }}>
              <Text style={[modal.modalHeader, { alignSelf: "center" }]}>
                Velg filter
              </Text>

              <ProduktTypeFilter
                produktFilter={produktFilter}
                oppdaterProduktFilter={oppdaterProduktFilter}
              />

              <LandFilter
                landFilter={landFilter}
                oppdaterLandFilter={oppdaterLandFilter}
              />
              <View style={filterModalStyles.checkboxContainer}>
                <Checkbox
                  text="Kan drikkes nå"
                  checked={innenforDrikkevindu}
                  onPress={() => setInnenforDrikkevindu(!innenforDrikkevindu)}
                />
              </View>

              <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
                <Knapp
                  styles={{ marginRight: 10 }}
                  onPress={() => setVisFiltrerModal(!visModal)}
                  knappetekst="Avbryt"
                />
                <Knapp
                  styles={{ marginRight: 10 }}
                  onPress={() => {
                    setProduktFilter(null);
                    setLandFilter(null);
                    setInnenforDrikkevindu(false);
                    filtrerInnhold({
                      PRODUKT_TYPE: null,
                      LAND: null,
                      INNENFOR_DRIKKEVINDU: false
                    });
                    setVisFiltrerModal(!visModal);
                  }}
                  knappetekst="Nullstill"
                />
                <Knapp
                  onPress={() => {
                    filtrerInnhold({
                      PRODUKT_TYPE: produktFilter,
                      LAND: landFilter,
                      INNENFOR_DRIKKEVINDU: innenforDrikkevindu
                    });
                    setVisFiltrerModal(!visModal);
                  }}
                  knappetekst="Filtrér"
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FilterModal;
