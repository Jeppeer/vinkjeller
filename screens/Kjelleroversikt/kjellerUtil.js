import { StyleSheet } from "react-native";
import { sortering } from "./SorterModal";

export const PRODUKT_TYPE = "PRODUKT_TYPE";
export const LAND = "LAND";
export const INNENFOR_DRIKKEVINDU = "INNENFOR_DRIKKEVINDU";

export const sorter = (valgtSortering, elementer) => {
  switch (valgtSortering) {
    case sortering.lagtTilStigende.verdi:
      return elementer.sort(
        (a, b) => new Date(a[1].tidLagtTil) - new Date(b[1].tidLagtTil)
      );
    case sortering.lagtTilSynkende.verdi:
      return elementer.sort(
        (a, b) => new Date(b[1].tidLagtTil) - new Date(a[1].tidLagtTil)
      );
    case sortering.aarKjoeptStigende.verdi:
      return elementer.sort((a, b) => b[1].aarKjopt - a[1].aarKjopt);
    case sortering.aarKjoeptSynkende.verdi:
      return elementer.sort((a, b) => a[1].aarKjopt - b[1].aarKjopt);
    case sortering.navnStigende.verdi:
      return elementer.sort((a, b) => compare(a, b, "navn"));
    case sortering.navnSynkende.verdi:
      return elementer.sort((a, b) => compare(a, b, "navn")).reverse();
    case sortering.prisLavesteFoerst.verdi:
      return elementer.sort((a, b) => a[1].pris - b[1].pris);
    case sortering.prisHoeyesteFoerst.verdi:
      return elementer.sort((a, b) => b[1].pris - a[1].pris);
  }
};

const compare = (a, b, field) => {
  if (a[1][field] < b[1][field]) {
    return -1;
  }
  if (a[1][field] > b[1][field]) {
    return 1;
  }
  return 0;
};

export const filtrer = (filterListe, alleElementer) => {
  return alleElementer
    .filter(element => produktTypeFilter(element[1], filterListe[PRODUKT_TYPE]))
    .filter(element => landFilter(element[1], filterListe[LAND]))
    .filter(element =>
      drikkevinduFilter(element[1], filterListe[INNENFOR_DRIKKEVINDU])
    );
};

const produktTypeFilter = (element, filter) => {
  if (!filter) {
    return true;
  }
  if (filter === "Annet") {
    return (
      element.produktType !== "Rødvin" &&
      element.produktType !== "Hvitvin" &&
      element.produktType !== "Musserende vin"
    );
  } else {
    return element.produktType === filter;
  }
};

const landFilter = (element, filter) => {
  if (!filter) {
    return true;
  }
  if (!element.region || !element.region.land) {
    return false;
  }
  return element.region.land === filter;
};

const drikkevinduFilter = (element, drikkevinduFilter) => {
  if (!drikkevinduFilter) {
    return true;
  }
  if (!element.drikkevindu || !element.drikkevindu.fra) {
    return false;
  }
  return element.drikkevindu.fra <= new Date().getFullYear();
};

export const filterModalStyles = StyleSheet.create({
  filterType: { alignItems: "flex-start", marginBottom: 20 },
  filterTypeText: { marginBottom: 5 },
  filterKnapp: { marginRight: 2, marginBottom: 2 },
  checkboxContainer: {
    marginBottom: 20
  },
  checkbox: {
    alignSelf: "center"
  },
  label: {
    margin: 8
  }
});
