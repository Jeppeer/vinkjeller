import React from "react";
import { Input } from "react-native-elements";
import { Text, View } from "react-native";
import {nyVinStyles} from "./styles";

const Drikkevindu = ({ handleChange, handleBlur, values }) => {
  return (
    <View>
      <Text style={[nyVinStyles.labelStyle, nyVinStyles.separateLabel]}>
        Drikkevindu
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Input
          label="Fra"
          keyboardType="numeric"
          onChangeText={handleChange("drikkevinduFra")}
          onBlur={handleBlur("drikkevinduFra")}
          value={values.drikkevinduFra}
          returnKeyType="next"
          containerStyle={{ width: "auto" }}
          inputContainerStyle={[
            nyVinStyles.inputContainerStyle,
            nyVinStyles.tallInput
          ]}
          labelStyle={nyVinStyles.labelStyle}
        />
        <Text>-</Text>
        <Input
          label="Til"
          keyboardType="numeric"
          onChangeText={handleChange("drikkevinduTil")}
          onBlur={handleBlur("drikkevinduTil")}
          value={values.drikkevinduTil}
          returnKeyType="next"
          containerStyle={{ width: "auto" }}
          inputContainerStyle={[
            nyVinStyles.inputContainerStyle,
            nyVinStyles.tallInput
          ]}
          labelStyle={nyVinStyles.labelStyle}
        />
      </View>
    </View>
  );
};

export default Drikkevindu;
