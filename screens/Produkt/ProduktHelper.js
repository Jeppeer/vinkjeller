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
    pris: Number.parseFloat(produkt.prices[0].salesPrice).toFixed(2),
    produktType: produkt.classification.productTypeName,
    aarKjopt: new Date().getFullYear()
  };
};

export const getIngredienser = ingredienser => {
  if (Array.isArray(ingredienser)) {
    return ingredienser
      .map(drue => `${drue.grapeDesc} ${drue.grapePct}%`)
      .join(", ");
  } else {
    return ingredienser;
  }
};

export const getPasserTil = anbefaltMat => {
  return anbefaltMat.length
    ? anbefaltMat.map(matType => matType.foodDesc).join(", ")
    : "-";
};
