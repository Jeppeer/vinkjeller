import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../styles/common";

const LeggTilKnapp = ({ onClick }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed
            ? colors.primaryButtonPressed
            : colors.primaryButton
        },
        styles.leggTilKnapp
      ]}
      onPress={() => {
        onClick();
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          padding: 15
        }}
      >
        <AntDesign
          name="pluscircle"
          size={24}
          color="white"
          style={{ marginRight: 10 }}
        />
        <Text style={{ color: "white" }}>Legg til flaske</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  leggTilKnapp: {
    borderRadius: 30,
    position: "absolute",
    bottom: 10,
    right: 10
  }
});

export default LeggTilKnapp;
