import { StyleSheet } from "react-native";

export const PRODUKT_TYPE = "PRODUKT_TYPE";
export const LAND = "LAND";
export const INNENFOR_DRIKKEVINDU = "INNENFOR_DRIKKEVINDU";

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
  return element.drikkevindu.fra < new Date().getFullYear();
};

export const filterModalStyles = StyleSheet.create({
  filterType: { alignItems: "flex-start", marginBottom: 20 },
  filterTypeText: { marginBottom: 5 },
  filterKnapp: { marginRight: 2, marginBottom: 2 },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20
  },
  checkbox: {
    alignSelf: "center"
  },
  label: {
    margin: 8
  }
});
