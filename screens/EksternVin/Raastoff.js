import React from "react";
import { Text, View } from "react-native";
import Knapp from "../../components/knapp/Knapp";
import { Input } from "react-native-elements";
import { FieldArray } from "formik";
import { eksternVinStyles } from "./styles";
import IkonKnapp from "../../components/knapp/IkonKnapp";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../styles/common";

const Raastoff = ({ handleChange, values }) => (
  <View style={{ marginBottom: 20 }}>
    <FieldArray
      name="raastoff"
      render={arrayHelpers => (
        <View style={{ alignItems: "flex-start" }}>
          <Text style={[eksternVinStyles.labelStyle, eksternVinStyles.separateLabel]}>
            Råstoff
          </Text>
          {values.raastoff &&
            values.raastoff.length > 0 &&
            values.raastoff.map((drue, index) => (
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
                    onChangeText={handleChange(`raastoff.${index}.grapeDesc`)}
                    value={drue.grapeDesc}
                    returnKeyType="next"
                    inputContainerStyle={[
                      eksternVinStyles.inputContainerStyle,
                      { marginBottom: 0 }
                    ]}
                    labelStyle={eksternVinStyles.labelStyle}
                  />
                </View>
                <View style={[eksternVinStyles.inputMedBenevning]}>
                  <Input
                    label="Prosent"
                    keyboardType="numeric"
                    onChangeText={handleChange(`raastoff.${index}.grapePct`)}
                    value={drue.grapePct}
                    returnKeyType="next"
                    containerStyle={{ width: "auto" }}
                    inputContainerStyle={[
                      eksternVinStyles.inputContainerStyle,
                      { marginBottom: 0 }
                    ]}
                    labelStyle={eksternVinStyles.labelStyle}
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
            onPress={() => arrayHelpers.push({ grapeDesc: "", grapePct: "" })}
            knappetekst="Legg til drue"
            styles={{ marginLeft: 10 }}
          />
        </View>
      )}
    />
  </View>
);

export default Raastoff;
