import React from "react";
import { View } from "react-native";
import { Input } from "react-native-elements";
import { inputStyles } from "../../styles/common";

const Region = ({ handleChange, values }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Input
        label="Land"
        onChangeText={handleChange("region.land")}
        value={values.region ? values.region.land : ""}
        returnKeyType="next"
        containerStyle={{ width: "50%" }}
        inputContainerStyle={inputStyles.inputContainerStyle}
        labelStyle={inputStyles.labelStyle}
      />
      <Input
        label="Region"
        onChangeText={handleChange("region.region")}
        value={values.region ? values.region.region : ""}
        returnKeyType="next"
        containerStyle={{ width: "50%" }}
        inputContainerStyle={inputStyles.inputContainerStyle}
        labelStyle={inputStyles.labelStyle}
      />
    </View>
  );
};

export default Region;
