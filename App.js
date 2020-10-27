import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import VinOversikt from "./screens/VinOversikt";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Produkt from "./screens/Produkt/Produkt";
import Soek from "./screens/Soek/Soek";
import Soekeresultater from "./screens/Soek/Soekeresultater";
import { colors } from "./styles/common";
import * as firebase from "firebase";
import { InteractionManager, Platform } from "react-native";

/////////////////////////////////////////////////////////////////////////////
////// temporary fix to bug about 'Setting a timer' /////////////////////////
////// See: https://github.com/pusher/pusher-js/issues/248 //////////////////
////// See: https://github.com/facebook/react-native/issues/12981 ///////////
////// See: https://github.com/firebase/firebase-js-sdk/issues/97 ///////////
/////////////////////////////////////////////////////////////////////////////
const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === "android") {
  const timerFix = {};
  const runTask = (id, fn, ttl, args) => {
    const waitingTime = ttl - Date.now();
    if (waitingTime <= 1) {
      InteractionManager.runAfterInteractions(() => {
        if (!timerFix[id]) {
          return;
        }
        delete timerFix[id];
        fn(...args);
      });
      return;
    }
    const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
    timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
  };
  global.setTimeout = (fn, time, ...args) => {
    if (MAX_TIMER_DURATION_MS < time) {
      const ttl = Date.now() + time;
      const id = "_lt_" + Object.keys(timerFix).length;
      runTask(id, fn, ttl, args);
      return id;
    }
    return _setTimeout(fn, time, ...args);
  };
  global.clearTimeout = id => {
    if (typeof id === "string" && id.startsWith("_lt_")) {
      _clearTimeout(timerFix[id]);
      delete timerFix[id];
      return;
    }
    _clearTimeout(id);
  };
}

const Tab = createBottomTabNavigator();
const SoekStack = createStackNavigator();

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyB9jZ8liTAnOmG9hSIren3p2rgLtTVckz8",
    authDomain: "vinkjeller-baeb3.firebaseapp.com",
    databaseURL: "https://vinkjeller-baeb3.firebaseio.com",
    projectId: "vinkjeller-baeb3",
    storageBucket: "vinkjeller-baeb3.appspot.com"
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: colors.primarySelected,
          style: {
            backgroundColor: colors.primaryBg,
            borderTopColor: colors.borderColor
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
          backgroundColor: colors.primaryBg,
          elevation: 0
        },
        headerTintColor: colors.primarySelected,
        headerTitleStyle: {
          fontWeight: "bold"
        },
        headerTitleAlign: "center"
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
      <SoekStack.Screen name="Produkt" component={Produkt} />
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
        },
        headerTitleAlign: "center"
      }}
    >
      <SoekStack.Screen name="VinOversikt" component={VinOversikt} />
      <SoekStack.Screen name="Produkt" component={Produkt} />
    </SoekStack.Navigator>
  );
}
