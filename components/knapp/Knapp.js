import React from "react";
import { colors } from "../../styles/common";
import { Pressable, Text, StyleSheet } from "react-native";

const Knapp = ({ styles, onPress, knappetekst }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed
            ? colors.primaryButtonPressed
            : colors.primaryButton
        },
        knappStyles.knapp,
        styles
      ]}
      onPress={onPress}
    >
      <Text style={{ color: "white" }}>{knappetekst}</Text>
    </Pressable>
  );
};

export const knappStyles = StyleSheet.create({
  knapp: {
    borderRadius: 50,
    padding: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  selected: {
    backgroundColor: colors.primaryButtonPressed
  }
});
export default Knapp;
