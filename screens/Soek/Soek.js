import React, { useState, useEffect } from "react";
import { Button, Text, View } from "react-native";
import { SearchBar } from "react-native-elements";

const Soek = ({ navigation }) => {
  const [soekeTerm, setSoekeTerm] = useState("");

  const navigate = () => {
    navigation.navigate("Soekeresultater");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <SearchBar
        placeholder="Søk..."
        onChangeText={setSoekeTerm}
        value={soekeTerm}
      />

      {/*<Text>Søk test</Text>*/}
      {/*<Button*/}
      {/*  onPress={navigate}*/}
      {/*  title="Push"*/}
      {/*  color="#841584"*/}
      {/*  accessibilityLabel="Learn more about this purple button"*/}
      {/*/>*/}
    </View>
  );
};

export default Soek;
