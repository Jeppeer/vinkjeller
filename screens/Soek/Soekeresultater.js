import React from "react";
import {FlatList, Text, View} from "react-native";
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
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Ingen treff.
          </Text>
        }
      />
    </View>
  );
};

export default Soekeresultater;
