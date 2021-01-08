import React from "react";
import { Input } from "react-native-elements";
import { Text, View } from "react-native";
import { eksternVinStyles } from "./styles";
import {inputStyles} from "../../styles/common";

const Drikkevindu = ({ handleChange, values }) => {
  return (
    <View>
      <Text style={[inputStyles.labelStyle, inputStyles.separateLabel]}>
        Drikkevindu
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Input
          label="Fra"
          keyboardType="numeric"
          onChangeText={handleChange("drikkevindu.fra")}
          value={values.drikkevindu ? values.drikkevindu.fra : ""}
          returnKeyType="next"
          containerStyle={{ width: "auto" }}
          inputContainerStyle={[
            inputStyles.inputContainerStyle,
            eksternVinStyles.tallInput
          ]}
          labelStyle={inputStyles.labelStyle}
        />
        <Text>-</Text>
        <Input
          label="Til"
          keyboardType="numeric"
          onChangeText={handleChange("drikkevindu.til")}
          value={values.drikkevindu ? values.drikkevindu.til : ""}
          returnKeyType="next"
          containerStyle={{ width: "auto" }}
          inputContainerStyle={[
            inputStyles.inputContainerStyle,
            eksternVinStyles.tallInput
          ]}
          labelStyle={inputStyles.labelStyle}
        />
      </View>
    </View>
  );
};

export default Drikkevindu;
