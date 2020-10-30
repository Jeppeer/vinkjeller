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
      region: produkt.origins.origin.region,
      subRegion: produkt.origins.origin.subRegion
    },
    pris: Number.parseFloat(produkt.prices[0].salesPrice).toFixed(2)
  };
};

export const getIngredienser = ingredienser => {
  if (ingredienser.grapes.length) {
    return ingredienser.grapes
      .map(grape => `${grape.grapeDesc} ${grape.grapePct}%`)
      .join(", ");
  } else {
    return ingredienser.ingredients;
  }
};

export const getPasserTil = anbefaltMat => {
  return anbefaltMat.map(matType => matType.foodDesc).join(", ");
};
