export const opprettProduktBasertPaa = produkt => ({
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
  produktType: produkt.classification.subProductTypeName,
  aarKjopt: new Date().getFullYear()
});

export const opprettNyttProdukt = values => ({
  navn: values.navn,
  aargang: values.aargang ? values.aargang : 0,
  // raastoff: produkt.ingredients.grapes.length
  //   ? produkt.ingredients.grapes
  //   : produkt.ingredients.ingredients,
  produsent: values.produsent,
  alkoholprosent: values.alkoholprosent,
  region: {
    land: values.land,
    region: values.region
  },
  pris: Number.parseFloat(values.pris).toFixed(2),
  // produktType: produkt.classification.subProductTypeName,
  aarKjopt: values.aarKjopt,
  notat: values.notat,
  drikkevindu: {
    fra: values.drikkevinduFra,
    til: values.drikkevinduTil
  }
  // antallIKjeller: values.antallIKjeller
});

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
  return anbefaltMat && anbefaltMat.length
    ? anbefaltMat.map(matType => matType.foodDesc).join(", ")
    : "-";
};
