import { StyleSheet } from "react-native";
import { input } from "../../styles/common";

export const nyVinStyles = StyleSheet.create({
  labelStyle: {
    color: input.primaryColor,
    fontSize: 14,
    marginBottom: 5
  },
  separateLabel: {
    paddingLeft: 10,
    paddingBottom: 5,
    fontSize: 16,
    fontWeight: "bold"
  },
  inputContainerStyle: {
    borderBottomColor: input.primaryColor,
    borderBottomWidth: 0.5,
    marginBottom: 5,
  },
  lineInput: {
    marginBottom: 15,
    backgroundColor: "white",
    fontSize: 16,
    height: 45,
    borderBottomWidth: 0.5
  },
  aarInput: { width: 80 }
});
