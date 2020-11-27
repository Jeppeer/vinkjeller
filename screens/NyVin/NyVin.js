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
import PlussMinusTeller from "../../components/teller/PlussMinusTeller";

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
            Her kan du registrere vin som ikke finnes på Vinmonopolet. Dersom
            vinen allerede finnes på Vinmonopolet kan du finne den under 'Søk'.
          </Text>
        </View>
        <Formik
          innerRef={formRef}
          initialValues={{
            antallIKjeller: "1",
            raastoff: [],
            volum: "75"
          }}
          onSubmit={values => {
            const nyttProdukt = firebaseRef.push();
            if (!values.antallIKjeller) {
              values.antallIKjeller = "1";
            }
            nyttProdukt.set(values).then(() => {
              navigation.goBack();
            });
          }}
          validate={values => {
            const errors = {};
            if (!values.navn) {
              errors.navn = "Du må oppgi navn på vinen";
            }
            return errors;
          }}
        >
          {({ handleChange, errors, handleBlur, values, setValues }) => (
            <View>
              <Input
                label="Navn på vin"
                onChangeText={handleChange("navn")}
                value={values.navn}
                returnKeyType="next"
                inputContainerStyle={nyVinStyles.inputContainerStyle}
                labelStyle={nyVinStyles.labelStyle}
                errorMessage={errors["navn"]}
              />
              <Input
                label="Produsent"
                onChangeText={handleChange("produsent")}
                value={values.produsent}
                returnKeyType="next"
                inputContainerStyle={nyVinStyles.inputContainerStyle}
                labelStyle={nyVinStyles.labelStyle}
              />
              <Input
                label="Årgang"
                keyboardType="numeric"
                onChangeText={handleChange("aargang")}
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
                value={values.notat}
                returnKeyType="next"
                inputContainerStyle={nyVinStyles.inputContainerStyle}
                labelStyle={nyVinStyles.labelStyle}
              />
              <Region handleChange={handleChange} values={values} />

              <View style={{ margin: 10 }}>
                <Text style={[nyVinStyles.labelStyle, { fontWeight: "bold" }]}>
                  Velg antall
                </Text>
                <PlussMinusTeller
                  inputVerdi={values.antallIKjeller}
                  onPressMinus={() => {
                    if (values.antallIKjeller > 1) {
                      {
                        setValues({
                          ...values,
                          antallIKjeller: (
                            parseInt(values.antallIKjeller) - 1
                          ).toString()
                        });
                      }
                    }
                  }}
                  onPressPluss={() => {
                    setValues({
                      ...values,
                      antallIKjeller: (
                        parseInt(values.antallIKjeller) + 1
                      ).toString()
                    });
                  }}
                  onChangeText={handleChange("antallIKjeller")}
                />
              </View>

              <Knapp
                onPress={() => setVisEkstraFelter(!visEkstraFelter)}
                knappetekst={
                  visEkstraFelter ? "Skjul ekstra felter" : "Vis ekstra felter"
                }
                styles={{ margin: 10, marginBottom: 30 }}
              />

              {visEkstraFelter && (
                <View>
                  <Drikkevindu handleChange={handleChange} values={values} />
                  <Raastoff values={values} handleChange={handleChange} />

                  <View style={nyVinStyles.inputMedBenevning}>
                    <Input
                      label="Volum"
                      keyboardType="numeric"
                      onChangeText={handleChange("volum")}
                      value={values.volum}
                      returnKeyType="next"
                      containerStyle={{ width: "auto" }}
                      inputContainerStyle={[
                        nyVinStyles.inputContainerStyle,
                        nyVinStyles.tallInput
                      ]}
                      labelStyle={nyVinStyles.labelStyle}
                    />
                    <Text>cl</Text>
                  </View>
                  <View style={nyVinStyles.inputMedBenevning}>
                    <Input
                      label="Alkohol"
                      keyboardType="numeric"
                      onChangeText={handleChange("alkoholprosent")}
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
                  <Input
                    label="Smak"
                    onChangeText={handleChange("smak")}
                    value={values.smak}
                    returnKeyType="next"
                    inputContainerStyle={nyVinStyles.inputContainerStyle}
                    labelStyle={nyVinStyles.labelStyle}
                  />
                  <Input
                    label="Lukt"
                    onChangeText={handleChange("lukt")}
                    value={values.lukt}
                    returnKeyType="next"
                    inputContainerStyle={nyVinStyles.inputContainerStyle}
                    labelStyle={nyVinStyles.labelStyle}
                  />
                  <Input
                    label="Farge"
                    onChangeText={handleChange("farge")}
                    value={values.farge}
                    returnKeyType="next"
                    inputContainerStyle={nyVinStyles.inputContainerStyle}
                    labelStyle={nyVinStyles.labelStyle}
                  />
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
