import React from "react";
import { Text, View } from "react-native";

const Pris = ({ pris, style }) => {
  return (
    <Text
      style={[
        style,
        {
          paddingBottom: 10
        }
      ]}
    >
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
