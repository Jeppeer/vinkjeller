import React from "react";
import { Pressable, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../styles/common";

const Checkbox = ({ text, checked, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.square}>
          {checked && (
            <AntDesign
              style={styles.checkmark}
              name="check"
              size={21}
              color={colors.primaryButton}
            />
          )}
        </View>
        <Text style={styles.textStyle}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default Checkbox;

export const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  square: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderRadius: 3,
    borderColor: colors.primaryButton
  },
  checkmark: {
    position: "relative"
  },
  textStyle: {
    marginLeft: 10
  }
};
