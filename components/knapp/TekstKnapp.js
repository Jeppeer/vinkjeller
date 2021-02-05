import { Pressable, Text, StyleSheet, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const TekstKnapp = ({ styles, onPress, knappetekst, selected }) => {
  return (
    <Pressable style={() => [tekstKnappStyles.style, styles]} onPress={onPress}>
      {selected && (
        <AntDesign
          name="right"
          size={12}
          color="black"
          style={{ marginRight: 5 }}
        />
      )}
      <Text>{knappetekst}</Text>
    </Pressable>
  );
};

export const tekstKnappStyles = StyleSheet.create({
  style: {
    padding: 5,
    margin: 5,
    flexDirection: "row",
    alignItems: "center"
  }
});

export default TekstKnapp;
