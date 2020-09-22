import React from "react";
import { Button, Text, View } from "react-native";

const Soekeresultater = ({ navigation }) => {
  const navigate = () => {
    navigation.navigate("Vin");
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Søkeresultater</Text>
      <Button
        onPress={navigate}
        title="Push"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
};

export default Soekeresultater;
