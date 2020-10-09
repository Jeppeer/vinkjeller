import React from "react";
import { FlatList, View } from "react-native";
import Soekeresultat from "./Soekeresultat";

const Soekeresultater = ({ route, navigation }) => {
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <FlatList
        data={route.params.soekeresultat}
        renderItem={item => (
          <Soekeresultat produkt={item.item} navigation={navigation} />
        )}
        keyExtractor={item => item.basic.productId}
      />
    </View>
  );
};

export default Soekeresultater;
