import React from "react";
import { Text, View } from "react-native";
import Knapp from "../../components/knapp/Knapp";
import { Input } from "react-native-elements";
import { FieldArray } from "formik";
import { nyVinStyles } from "./styles";
import IkonKnapp from "../../components/knapp/IkonKnapp";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../styles/common";

const Raastoff = ({ handleBlur, handleChange, values }) => (
  <View style={{ marginBottom: 20 }}>
    <FieldArray
      name="druer"
      render={arrayHelpers => (
        <View style={{ alignItems: "flex-start" }}>
          <Text style={[nyVinStyles.labelStyle, nyVinStyles.separateLabel]}>
            Råstoff
          </Text>
          {values.druer &&
            values.druer.length > 0 &&
            values.druer.map((drue, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  flexDirection: "row"
                }}
              >
                <View style={{ flexGrow: 1 }}>
                  <Input
                    label="Drue"
                    onChangeText={handleChange("drue")}
                    onBlur={handleBlur("drue")}
                    value={drue.navn}
                    returnKeyType="next"
                    inputContainerStyle={[
                      nyVinStyles.inputContainerStyle,
                      { marginBottom: 0 }
                    ]}
                    labelStyle={nyVinStyles.labelStyle}
                  />
                </View>
                <View style={[nyVinStyles.inputMedBenevning]}>
                  <Input
                    label="Prosent"
                    keyboardType="numeric"
                    onChangeText={handleChange("prosent")}
                    onBlur={handleBlur("prosent")}
                    value={drue.prosent}
                    returnKeyType="next"
                    containerStyle={{ width: "auto" }}
                    inputContainerStyle={[
                      nyVinStyles.inputContainerStyle,
                      { marginBottom: 0 }
                    ]}
                    labelStyle={nyVinStyles.labelStyle}
                  />
                  <Text>%</Text>
                  <IkonKnapp
                    styles={{ marginLeft: 10 }}
                    onPress={() => arrayHelpers.remove(index)}
                  >
                    <AntDesign
                      name="minuscircle"
                      size={24}
                      color={colors.primaryButton}
                    />
                  </IkonKnapp>
                </View>
              </View>
            ))}
          <Knapp
            onPress={() => arrayHelpers.push({ navn: "", prosent: "" })}
            knappetekst="Legg til drue"
            styles={{ marginLeft: 10 }}
          />
        </View>
      )}
    />
  </View>
);

export default Raastoff;
