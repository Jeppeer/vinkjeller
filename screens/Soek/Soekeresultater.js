import React from "react";
import { FlatList, SafeAreaView } from "react-native";
import Soekeresultat from "./Soekeresultat";

const Soekeresultater = ({ route, navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
      <FlatList
        data={route.params.soekeresultat}
        renderItem={item => (
          <Soekeresultat produkt={item.item} navigation={navigation} />
        )}
        keyExtractor={item => item.basic.productId}
      />
    </SafeAreaView>
  );
};

export default Soekeresultater;
