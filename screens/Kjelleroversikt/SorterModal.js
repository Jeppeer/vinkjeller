import React from "react";
import { Modal, Text, TouchableWithoutFeedback, View } from "react-native";
import { modal } from "../../styles/common";
import TekstKnapp from "../../components/knapp/TekstKnapp";

export const sortering = {
  lagtTilStigende: {
    verdi: "LAGT_TIL_STIGENDE",
    tekst: "Sist lagt til (stigende)"
  },
  lagtTilSynkende: {
    verdi: "LAGT_TIL_SYNKENDE",
    tekst: "Sist lagt til (synkende)"
  },
  aarKjoeptStigende: {
    verdi: "AAR_KJOEPT_STIGENDE",
    tekst: "År kjøpt (stigende)"
  },
  aarKjoeptSynkende: {
    verdi: "AAR_KJOEPT_SYNKENDE",
    tekst: "År kjøpt (synkende)"
  },
  navnStigende: { verdi: "NAVN_STIGENDE", tekst: "Navn (stigende)" },
  navnSynkende: { verdi: "NAVN_SYNKENDE", tekst: "Navn (synkende)" },
  prisLavesteFoerst: {
    verdi: "PRIS_LAVESTE_FOERST",
    tekst: "Pris (laveste først)"
  },
  prisHoeyesteFoerst: {
    verdi: "PRIS_HOEYESTE_FOERST",
    tekst: "Pris (høyeste først)"
  }
};

const SorterModal = ({
  visModal,
  sorterInnhold,
  valgtSortering,
  setVisModal
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visModal}
      propagateSwipe={true}
      onRequestClose={() => setVisModal(false)}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          setVisModal(false);
        }}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={[modal.modal, { padding: 20 }]}>
            <View style={{ width: "100%" }}>
              <Text style={[modal.modalHeader, { alignSelf: "center" }]}>
                Sortér
              </Text>
              <TekstKnapp
                onPress={() => {
                  sorterInnhold(sortering.lagtTilStigende.verdi);
                }}
                knappetekst={sortering.lagtTilStigende.tekst}
                selected={valgtSortering === sortering.lagtTilStigende.verdi}
              />
              <TekstKnapp
                onPress={() => {
                  sorterInnhold(sortering.lagtTilSynkende.verdi);
                }}
                knappetekst={sortering.lagtTilSynkende.tekst}
                selected={valgtSortering === sortering.lagtTilSynkende.verdi}
              />
              <TekstKnapp
                onPress={() => {
                  sorterInnhold(sortering.aarKjoeptStigende.verdi);
                }}
                knappetekst={sortering.aarKjoeptStigende.tekst}
                selected={valgtSortering === sortering.aarKjoeptStigende.verdi}
              />
              <TekstKnapp
                onPress={() => {
                  sorterInnhold(sortering.aarKjoeptSynkende.verdi);
                }}
                knappetekst={sortering.aarKjoeptSynkende.tekst}
                selected={valgtSortering === sortering.aarKjoeptSynkende.verdi}
              />
              <TekstKnapp
                onPress={() => {
                  sorterInnhold(sortering.navnStigende.verdi);
                }}
                knappetekst={sortering.navnStigende.tekst}
                selected={valgtSortering === sortering.navnStigende.verdi}
              />
              <TekstKnapp
                onPress={() => {
                  sorterInnhold(sortering.navnSynkende.verdi);
                }}
                knappetekst={sortering.navnSynkende.tekst}
                selected={valgtSortering === sortering.navnSynkende.verdi}
              />
              <TekstKnapp
                onPress={() => {
                  sorterInnhold(sortering.prisLavesteFoerst.verdi);
                }}
                knappetekst={sortering.prisLavesteFoerst.tekst}
                selected={valgtSortering === sortering.prisLavesteFoerst.verdi}
              />
              <TekstKnapp
                onPress={() => {
                  sorterInnhold(sortering.prisHoeyesteFoerst.verdi);
                }}
                knappetekst={sortering.prisHoeyesteFoerst.tekst}
                selected={valgtSortering === sortering.prisHoeyesteFoerst.verdi}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SorterModal;
