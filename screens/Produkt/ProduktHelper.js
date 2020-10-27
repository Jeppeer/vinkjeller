export const opprettProduktBasertPaa = produkt => {
  return {
    produktId: produkt.basic.productId,
    navn: produkt.basic.productShortName,
    aargang: produkt.basic.vintage,
    raastoff: produkt.ingredients.grapes.length
      ? produkt.ingredients.grapes
      : produkt.ingredients.ingredients,
    lagringsgrad: produkt.properties.storagePotential,
    anbefaltMat: produkt.description.recommendedFood,
    produsent: produkt.logistics.manufacturerName,
    alkoholprosent: produkt.basic.alcoholContent,
    utvalg: produkt.assortment.assortment,
    region: {
      land: produkt.origins.origin.country,
      region: produkt.origins.origin.country,
      subRegion: produkt.origins.origin.country
    }
  };
};
