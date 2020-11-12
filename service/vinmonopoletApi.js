export const vinmonopolet_config = {
  headers: {
    "Ocp-Apim-Subscription-Key": "b2c1c8d6dfa9405db0ff0c3411ed1ed2"
  }
};

export const produktIdSoek = produktId =>
  `https://apis.vinmonopolet.no/products/v0/details-normal?productId=${produktId}`;
