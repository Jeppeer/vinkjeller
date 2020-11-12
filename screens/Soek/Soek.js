import React, { useState } from "react";
import { View } from "react-native";
import { SearchBar } from "react-native-elements";
import { colors } from "../../styles/common";
import { api } from "../../service/api";
import {
  produktIdSoek,
  vinmonopolet_config
} from "../../service/vinmonopoletApi";

const Soek = ({ navigation }) => {
  const [soekeTerm, setSoekeTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const search = () => {
    setIsLoading(true);
    let soekeUrl;
    if (Number.isNaN(Number(soekeTerm))) {
      soekeUrl = `https://apis.vinmonopolet.no/products/v0/details-normal?productShortNameContains=${soekeTerm.replace(
        /\s/g,
        "_"
      )}`;
    } else {
      soekeUrl = produktIdSoek(soekeTerm);
    }
    api.get(soekeUrl, vinmonopolet_config).then(resultat => {
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
