import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Formik } from "formik";
import { Input } from "react-native-elements";
import Drikkevindu from "./Drikkevindu";
import Raastoff from "./Raastoff";
import { nyVinStyles } from "./styles";
import Region from "./Region";

const NyVin = () => {
  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ margin: 20 }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 20 }}>Legg ny flaske i kjelleren</Text>
        </View>
        <Formik
          initialValues={{ navn: "", druer: [] }}
          onSubmit={values => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <Input
                label="Navn*"
                onChangeText={handleChange("navn")}
                onBlur={handleBlur("navn")}
                value={values.navn}
                returnKeyType="next"
                inputContainerStyle={nyVinStyles.inputContainerStyle}
                labelStyle={nyVinStyles.labelStyle}
              />
              <Input
                label="Notat"
                onChangeText={handleChange("notat")}
                onBlur={handleBlur("notat")}
                value={values.notat}
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
              <Region
                handleBlur={handleBlur}
                handleChange={handleChange}
                values={values}
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
                  nyVinStyles.aarInput
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
                  nyVinStyles.aarInput
                ]}
                labelStyle={nyVinStyles.labelStyle}
              />
              <Input
                label="Alkoholprosent %"
                keyboardType="numeric"
                onChangeText={handleChange("alkoholprosent")}
                onBlur={handleBlur("alkoholprosent")}
                value={values.alkoholprosent}
                returnKeyType="next"
                inputContainerStyle={[
                  nyVinStyles.inputContainerStyle,
                  nyVinStyles.aarInput
                ]}
                labelStyle={nyVinStyles.labelStyle}
              />
              <Input
                label="Pris"
                keyboardType="numeric"
                onChangeText={handleChange("pris")}
                onBlur={handleBlur("pris")}
                value={values.pris}
                returnKeyType="next"
                inputContainerStyle={[
                  nyVinStyles.inputContainerStyle,
                  nyVinStyles.aarInput
                ]}
                labelStyle={nyVinStyles.labelStyle}
              />
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
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default NyVin;
