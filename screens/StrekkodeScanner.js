import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  ToastAndroid,
  Vibration,
  View
} from "react-native";
import * as firebase from "firebase";
import { api } from "../service/api";
import { fritekstSoek, vinmonopolet_config } from "../service/vinmonopoletApi";
import { opprettProduktBasertPaa } from "./Produkt/ProduktHelper";
import { useFocusEffect } from "@react-navigation/native";
import { colors, spinner } from "../styles/common";
import { Camera } from "expo-camera";

const StrekkodeScanner = ({ navigation }) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [mountKamera, setMountKamera] = useState(true);
  let currentUser = firebase.auth().currentUser;
  let firebaseRef = firebase.database();
  let cameraRef;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    Alert.alert(
      "Feil i kommunikasjon med Vinmonopolet",
      "Vi opplever for tiden problemer i kommunikasjonen med Vinmonopolet. Dette fører til at det ikke er mulig å søke opp vin ved bruk av strekkode. Vi jobber med å rette feilen, og beklager ulempene dette medfører!",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }, []);

  useFocusEffect(
    useCallback(() => {
      setScanned(false);
      setMountKamera(true);
      return () => {
        setScanned(true);
        setMountKamera(false);
      };
    }, [])
  );

  const handleBarCodeScanned = ({ data }) => {
    const ref = cameraRef;
    Vibration.vibrate(30);
    ref.pausePreview();
    setShowSpinner(true);
    setScanned(true);

    api.get(fritekstSoek(data), vinmonopolet_config).then(resultat => {
      if (resultat.data.length > 0) {
        firebaseRef
          .ref(`brukere/${currentUser.uid}/kjeller`)
          .orderByChild("produktId")
          .equalTo(resultat.data[0].basic.productId)
          .once("value")
          .then(kjellerelement => {
            setMountKamera(false);
            setShowSpinner(false);
            const element = kjellerelement.val()
              ? Object.entries(kjellerelement.val())[0]
              : undefined;
            navigation.navigate("Produkt", {
              produkt: {
                ...opprettProduktBasertPaa(resultat.data[0]),
                antallIKjeller: element ? element[1].antallIKjeller : 0,
                drikkevindu: element ? element[1].drikkevindu : undefined,
                notat: element ? element[1].notat : "",
                aarKjopt: element
                  ? element[1].aarKjopt
                  : new Date().getFullYear().toString()
              },
              produktRef: element && element[0]
            });
          });
      } else {
        ToastAndroid.show("Ingen treff.", ToastAndroid.SHORT);
        ref.resumePreview();
        setShowSpinner(false);
        setTimeout(() => setScanned(false), 3000);
      }
    });
  };

  if (hasPermission === null) {
    return (
      <View style={spinner}>
        <ActivityIndicator color={colors.primaryButton} size="large" />
      </View>
    );
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {mountKamera && (
        <Camera
          type={Camera.Constants.Type.back}
          ref={ref => {
            cameraRef = ref;
          }}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          ratio="16:9"
          style={StyleSheet.absoluteFillObject}
        />
      )}
      {showSpinner && (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator color={colors.primaryButton} size="large" />
        </View>
      )}
    </View>
  );
};

export default StrekkodeScanner;
