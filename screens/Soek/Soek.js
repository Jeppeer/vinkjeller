import React, { useState } from "react";
import { View } from "react-native";
import { SearchBar } from "react-native-elements";
import { colors } from "../../styles/common";
import { api } from "../../service/api";

const Soek = ({ navigation }) => {
  const [soekeTerm, setSoekeTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const config = {
    headers: {
      "Ocp-Apim-Subscription-Key": "b2c1c8d6dfa9405db0ff0c3411ed1ed2"
    }
  };

  const search = () => {
    setIsLoading(true);
    let soekeUrl;
    if (Number.isNaN(Number(soekeTerm))) {
      soekeUrl = `https://apis.vinmonopolet.no/products/v0/details-normal?productShortNameContains=${soekeTerm.replace(
        /\s/g,
        "_"
      )}`;
    } else {
      soekeUrl = `https://apis.vinmonopolet.no/products/v0/details-normal?productId=${soekeTerm}`;
    }
    api.get(soekeUrl, config).then(resultat => {
      setIsLoading(false);
      navigation.navigate("Soekeresultater", { soekeresultat: resultat.data });
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: colors.primaryBg
      }}
    >
      <SearchBar
        placeholder="Søk"
        onChangeText={setSoekeTerm}
        value={soekeTerm}
        inputContainerStyle={{ backgroundColor: "white" }}
        containerStyle={{
          backgroundColor: colors.primaryBg,
          borderTopWidth: 0,
          borderBottomWidth: 0
        }}
        onSubmitEditing={search}
        returnKeyType="search"
        showLoading={isLoading}
        loadingProps={{ color: colors.primaryButton }}
      />
    </View>
  );
};

export default Soek;
