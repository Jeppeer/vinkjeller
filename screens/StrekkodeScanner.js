import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const StrekkodeScanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    // firebase
    //   .database()
    //   .ref("/kjeller")
    //   .orderByChild("basic/productId")
    //   .equalTo(produkt.basic.productId)
    //   .once("value")
    //   .then(result => {
    //     console.log(result);
    //   })
    navigation.navigate("Vin", { data: data });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end"
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};

export default StrekkodeScanner;
