import React from "react";
import { Text } from "react-native";

const Pris = ({ pris, style }) => {
  return (
    <Text style={[style]}>
      Kr{" "}
      {pris
        ? Number.parseFloat(pris)
            .toFixed(2)
            .replace(".", ",")
        : "-"}
    </Text>
  );
};

export default Pris;
