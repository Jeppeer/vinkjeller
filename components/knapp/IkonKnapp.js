import React from "react";
import { Pressable, View } from "react-native";

const IkonKnapp = ({ styles, onPress, children }) => {
  return (
    <Pressable style={styles} onPress={onPress}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {children}
      </View>
    </Pressable>
  );
};

export default IkonKnapp;
