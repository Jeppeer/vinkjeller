export const vinmonopolet_config = {
  headers: {
    "Ocp-Apim-Subscription-Key": "1ad2d3b366114954a2136386dcd79352"
  }
};

export const produktIdSoek = produktId =>
  `https://apis.vinmonopolet.no/press-products/v1/details-normal?productId=${produktId}`;

export const fritekstSoek = fritekst =>
  `https://apis.vinmonopolet.no/press-products/v1/details-normal?freeText=${fritekst}`;
