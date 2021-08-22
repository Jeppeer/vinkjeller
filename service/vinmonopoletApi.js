import { VINMONOPOLET_API_KEY } from "@env";

export const vinmonopolet_config = {
  headers: {
    "Ocp-Apim-Subscription-Key": VINMONOPOLET_API_KEY
  }
};

export const produktIdSoek = produktId =>
  `https://apis.vinmonopolet.no/press-products/v1/details-normal?productId=${produktId}`;

export const fritekstSoek = fritekst =>
  `https://apis.vinmonopolet.no/press-products/v1/details-normal?freeText=${fritekst}`;

export const productShortNameContainsSoek = produktnavn =>
  `https://apis.vinmonopolet.no/press-products/v1/details-normal?productShortNameContains=${produktnavn}`;
