import React from "react";
import { Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

const StrekkodeScanner = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", size: 24 }}>
      <Text>Komponent for å scanne strekkoder</Text>
    </View>
  );
};

export default StrekkodeScanner;
