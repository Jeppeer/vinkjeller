import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import VinOversikt from "./screens/VinOversikt";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Vin from "./screens/Vin";
import Soek from "./screens/Soek/Soek";
import Soekeresultater from "./screens/Soek/Soekeresultater";
import { colors } from "./styles/common";

const Tab = createBottomTabNavigator();
const SoekStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: colors.primarySelected,
          style: {
            backgroundColor: colors.primaryBg
          },
          tabStyle: {
            alignItems: "center",
            justifyContent: "center"
          },
          labelStyle: {
            marginTop: -5,
            marginBottom: 5
          }
        }}
        initialRouteName="StrekkodeScanner"
        activeColor={colors.primarySelected}
        barStyle={{ backgroundColor: colors.primaryBg }}
      >
        <Tab.Screen
          name="SoekScreen"
          component={SoekScreen}
          options={{
            tabBarLabel: "Søk",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="magnify" color={color} size={20} />
            )
          }}
        />
        <Tab.Screen
          name="VinOversiktScreen"
          component={VinOversiktScreen}
          options={{
            tabBarLabel: "Kjeller",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="bottle-wine"
                color={color}
                size={20}
              />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function SoekScreen() {
  return (
    <SoekStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primaryBg
        },
        headerTintColor: colors.primarySelected,
        headerTitleStyle: {
          fontWeight: "bold"
        }
      }}
    >
      <SoekStack.Screen
        name="Soek"
        component={Soek}
        options={{
          title: "Søk"
        }}
      />
      <SoekStack.Screen
        name="Soekeresultater"
        component={Soekeresultater}
        options={({ route }) => ({ title: route.params.name })}
      />
      <SoekStack.Screen name="Vin" component={Vin} />
    </SoekStack.Navigator>
  );
}

function VinOversiktScreen() {
  return (
    <SoekStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primaryBg
        },
        headerTintColor: colors.primarySelected,
        headerTitleStyle: {
          fontWeight: "bold"
        }
      }}
    >
      <SoekStack.Screen name="VinOversikt" component={VinOversikt} />
      <SoekStack.Screen name="Vin" component={Vin} />
    </SoekStack.Navigator>
  );
}
