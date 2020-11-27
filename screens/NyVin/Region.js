import React from "react";
import { View } from "react-native";
import { Input } from "react-native-elements";
import { nyVinStyles } from "./styles";

const Region = ({ handleChange, values }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Input
        label="Land"
        onChangeText={handleChange("land")}
        value={values.land}
        returnKeyType="next"
        containerStyle={{ width: "50%" }}
        inputContainerStyle={nyVinStyles.inputContainerStyle}
        labelStyle={nyVinStyles.labelStyle}
      />
      <Input
        label="Region"
        onChangeText={handleChange("region")}
        value={values.region}
        returnKeyType="next"
        containerStyle={{ width: "50%" }}
        inputContainerStyle={nyVinStyles.inputContainerStyle}
        labelStyle={nyVinStyles.labelStyle}
      />
    </View>
  );
};

export default Region;
