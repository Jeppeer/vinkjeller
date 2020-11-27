import React from "react";
import IkonKnapp from "../knapp/IkonKnapp";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../styles/common";
import { TextInput, View } from "react-native";

const PlussMinusTeller = ({
  onPressMinus,
  onPressPluss,
  inputVerdi,
  onChangeText,
  style
}) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <IkonKnapp onPress={onPressMinus}>
        <AntDesign name="minuscircle" size={30} color={colors.primaryButton} />
      </IkonKnapp>
      <TextInput
        style={[
          {
            height: 50,
            width: 50,
            fontSize: 18,
            textAlign: "center"
          },
          style
        ]}
        value={inputVerdi}
        keyboardType="numeric"
        onChangeText={onChangeText}
      />
      <IkonKnapp onPress={onPressPluss}>
        <AntDesign name="pluscircle" size={30} color={colors.primaryButton} />
      </IkonKnapp>
    </View>
  );
};

export default PlussMinusTeller;
