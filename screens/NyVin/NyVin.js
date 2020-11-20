import React, { useState, useLayoutEffect, useRef } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { Formik } from "formik";
import { Input } from "react-native-elements";
import Drikkevindu from "./Drikkevindu";
import Raastoff from "./Raastoff";
import { nyVinStyles } from "./styles";
import Region from "./Region";
import Knapp from "../../components/knapp/Knapp";
import * as firebase from "firebase";

const NyVin = ({ navigation }) => {
  const [visEkstraFelter, setVisEkstraFelter] = useState(false);
  const formRef = useRef();

  let firebaseRef = firebase.database().ref("kjeller");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (formRef.current) {
          return (
            <Knapp
              knappetekst="Lagre"
              onPress={() => {
                formRef.current.handleSubmit();
              }}
              styles={{ backgroundColor: "transparent", height: 70 }}
            />
          );
        }
      }
    });
  }, [navigation]);

  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ margin: 30 }}>
        <View>
          <Text style={{ textAlign: "center", marginBottom: 30 }}>
            Her kan du registrere vin som ikke finnes på Vinmonopolet. Felter
            merket med stjerne er obligatoriske.
          </Text>
        </View>
        <Formik
          innerRef={formRef}
          initialValues={{ navn: "", druer: [] }}
          onSubmit={values => {
            const nyttProdukt = firebaseRef.push();
            nyttProdukt.set(values).then(() => {
              navigation.goBack();
            });
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <Input
                label="Navn på vin*"
                onChangeText={handleChange("navn")}
                onBlur={handleBlur("navn")}
                value={values.navn}
                returnKeyType="next"
                inputContainerStyle={nyVinStyles.inputContainerStyle}
                labelStyle={nyVinStyles.labelStyle}
              />
              <Input
                label="Produsent"
                onChangeText={handleChange("produsent")}
                onBlur={handleBlur("produsent")}
                value={values.produsent}
                returnKeyType="next"
                inputContainerStyle={nyVinStyles.inputContainerStyle}
                labelStyle={nyVinStyles.labelStyle}
              />
              <Input
                label="Årgang"
                keyboardType="numeric"
                onChangeText={handleChange("aargang")}
                onBlur={handleBlur("aargang")}
                value={values.aargang}
                returnKeyType="next"
                inputContainerStyle={[
                  nyVinStyles.inputContainerStyle,
                  nyVinStyles.tallInput
                ]}
                labelStyle={nyVinStyles.labelStyle}
              />
              <Input
                label="År kjøpt"
                keyboardType="numeric"
                onChangeText={handleChange("aarKjopt")}
                onBlur={handleBlur("aarKjopt")}
                value={values.aarKjopt}
                returnKeyType="next"
                inputContainerStyle={[
                  nyVinStyles.inputContainerStyle,
                  nyVinStyles.tallInput
                ]}
                labelStyle={nyVinStyles.labelStyle}
              />
              <View style={nyVinStyles.inputMedBenevning}>
                <Input
                  label="Pris"
                  keyboardType="numeric"
                  onChangeText={handleChange("pris")}
                  onBlur={handleBlur("pris")}
                  value={values.pris}
                  returnKeyType="next"
                  containerStyle={{ width: "auto" }}
                  inputContainerStyle={[
                    nyVinStyles.inputContainerStyle,
                    nyVinStyles.tallInput
                  ]}
                  labelStyle={nyVinStyles.labelStyle}
                />
                <Text>kr</Text>
              </View>
              <Input
                label="Notat"
                onChangeText={handleChange("notat")}
                onBlur={handleBlur("notat")}
                value={values.notat}
                returnKeyType="next"
                inputContainerStyle={nyVinStyles.inputContainerStyle}
                labelStyle={nyVinStyles.labelStyle}
              />
              <Region
                handleBlur={handleBlur}
                handleChange={handleChange}
                values={values}
              />

              <Knapp
                onPress={() => setVisEkstraFelter(!visEkstraFelter)}
                knappetekst={
                  visEkstraFelter ? "Skjul ekstra felter" : "Vis ekstra felter"
                }
                styles={{ margin: 10, marginBottom: 30 }}
              />

              {visEkstraFelter && (
                <View>
                  <Drikkevindu
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    values={values}
                  />
                  <Raastoff
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  <View style={nyVinStyles.inputMedBenevning}>
                    <Input
                      label="Alkohol"
                      keyboardType="numeric"
                      onChangeText={handleChange("alkoholprosent")}
                      onBlur={handleBlur("alkoholprosent")}
                      value={values.alkoholprosent}
                      returnKeyType="next"
                      containerStyle={{ width: "auto" }}
                      inputContainerStyle={[
                        nyVinStyles.inputContainerStyle,
                        nyVinStyles.tallInput
                      ]}
                      labelStyle={nyVinStyles.labelStyle}
                    />
                    <Text>%</Text>
                  </View>
                </View>
              )}
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default NyVin;
