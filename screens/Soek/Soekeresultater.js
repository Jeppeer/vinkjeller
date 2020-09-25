import React from "react";
import {
  Button,
  SafeAreaView,
  SectionList,
  FlatList,
  Text,
  View
} from "react-native";
import Soekeresultat from "./Soekeresultat";

const Soekeresultater = ({ route, navigation }) => {
  return (
    <SafeAreaView>
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
