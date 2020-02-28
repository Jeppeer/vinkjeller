import React, { useEffect, useReducer } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Google from "expo-google-app-auth";
import StrekkodeScanner from "./screens/StrekkodeScanner";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import VinOversikt from "./screens/VinOversikt";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Loading from "./screens/Loading";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const reducer = () => {
  return (prevState, action) => {
    switch (action.type) {
      case "RESTORE_TOKEN":
        console.log("RESTORE_TOKEN: " + action.token);
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        };
      case "SIGN_IN":
        console.log("SIGN_IN: " + action.token);
        return {
          ...prevState,
          isLoading: false,
          userToken: action.token
        };
    }
  };
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    userToken: null
  });

  useEffect(() => {
    Google.logInAsync({
      androidClientId:
        "867635004398-k1qa1nmn1dp8i4mjj3rt5pio5cv216oj.apps.googleusercontent.com",
      iosClientId:
        "867635004398-akui23orm3uirf74mmskr0m0206jvrh7.apps.googleusercontent.com",
      scopes: [
        "profile",
        "email",
        "https://www.googleapis.com/auth/spreadsheets"
      ]
    }).then(result => {
      dispatch({ type: "SIGN_IN", token: result.accessToken });
    });
  }, []);

  return (
    <NavigationContainer>
      {state.isLoading ? (
        <Stack.Navigator>
          <Stack.Screen name="Loading" component={Loading} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator initialRouteName="StrekkodeScanner" labeled={false}>
          <Tab.Screen
            name="Hovedskjerm"
            component={StrekkodeScanner}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={24} />
              )
            }}
          />
          <Tab.Screen
            name="VinOversikt"
            component={VinOversikt}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="bell" color={color} size={24} />
              )
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
