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
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold"
  },
  inputContainerStyle: {
    borderBottomColor: input.primaryColor,
    borderBottomWidth: 0.5,
    width: "auto",
  },
  tallInput: { width: 80 },
  inputMedBenevning: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  }
});
