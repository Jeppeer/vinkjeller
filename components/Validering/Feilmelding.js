import React from "react";
import { Text } from "react-native";
import { colors } from "../../styles/common";

const Feilmelding = ({ feilmelding }) => {
  if (!feilmelding || feilmelding === "") {
    return null;
  }
  return (
    <Text style={{ color: colors.dangerButton, marginBottom: 20 }}>
      {feilmelding}
    </Text>
  );
};

export default Feilmelding;
