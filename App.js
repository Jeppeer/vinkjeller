import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import Kjelleroversikt from "./screens/Kjelleroversikt/Kjelleroversikt";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Produkt from "./screens/Produkt/Produkt";
import Soek from "./screens/Soek/Soek";
import Soekeresultater from "./screens/Soek/Soekeresultater";
import { colors } from "./styles/common";
import * as firebase from "firebase";
import { InteractionManager, Platform } from "react-native";
import StrekkodeScanner from "./screens/StrekkodeScanner";
import EksternVin from "./screens/EksternVin/EksternVin";
import Login from "./screens/Bruker/Login";
import Signup from "./screens/Bruker/Signup";
import IkonKnapp from "./components/knapp/IkonKnapp";
import Profil from "./screens/Bruker/Profil";

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
const StackNavigator = createStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyB9jZ8liTAnOmG9hSIren3p2rgLtTVckz8",
  authDomain: "vinkjeller-baeb3.firebaseapp.com",
  databaseURL: "https://vinkjeller-baeb3.firebaseio.com",
  projectId: "vinkjeller-baeb3",
  storageBucket: "vinkjeller-baeb3.appspot.com"
};

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  firebase.auth().onAuthStateChanged(function(user) {
    setUser(user);
    setIsLoading(false);
  });

  if (isLoading) {
    return null;
  }
  if (user === null) {
    return (
      <NavigationContainer>
        <StackNavigator.Navigator
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
          <StackNavigator.Screen
            options={{ title: "Logg inn" }}
            name="Login"
            component={Login}
          />
          <StackNavigator.Screen
            options={{ title: "Registrer deg" }}
            name="Signup"
            component={Signup}
          />
        </StackNavigator.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: colors.primarySelected,
          style: {
            backgroundColor: colors.primaryBg,
            borderTopWidth: 0
          },
          tabStyle: {
            alignItems: "center",
            justifyContent: "center"
          },
          labelStyle: {
            marginTop: -5,
            marginBottom: 5,
            fontSize: 13
          }
        }}
        activeColor={colors.primarySelected}
        barStyle={{ backgroundColor: colors.primaryBg }}
      >
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
        <Tab.Screen
          name="StrekkodeScannerScreen"
          component={StrekkodeScannerScreen}
          options={{
            tabBarLabel: "Strekkode",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="barcode-scan"
                color={color}
                size={20}
              />
            )
          }}
        />
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
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function SoekScreen() {
  return (
    <StackNavigator.Navigator
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
      <StackNavigator.Screen
        name="Soek"
        component={Soek}
        options={{
          title: "Søk"
        }}
      />
      <StackNavigator.Screen
        name="Soekeresultater"
        component={Soekeresultater}
        options={({ route }) => ({ title: route.params.name })}
      />
      <StackNavigator.Screen name="Produkt" component={Produkt} />
      <StackNavigator.Screen name="EksternVin" component={EksternVin} />
    </StackNavigator.Navigator>
  );
}

function StrekkodeScannerScreen() {
  return (
    <StackNavigator.Navigator
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
      <StackNavigator.Screen
        name="StrekkodeScanner"
        options={{
          title: "Scan en vare"
        }}
        component={StrekkodeScanner}
      />
      <StackNavigator.Screen name="Produkt" component={Produkt} />
    </StackNavigator.Navigator>
  );
}

function VinOversiktScreen() {
  return (
    <StackNavigator.Navigator
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
      <StackNavigator.Screen
        name="Kjelleroversikt"
        options={({ navigation }) => ({
          title: "Kjeller",
          headerRight: () => (
            <IkonKnapp
              onPress={() => navigation.navigate("Profil")}
              styles={{ marginRight: 10 }}
            >
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={35}
                color={colors.white}
              />
            </IkonKnapp>
          )
        })}
        component={Kjelleroversikt}
      />
      <StackNavigator.Screen name="Produkt" component={Produkt} />
      <StackNavigator.Screen name="EksternVin" component={EksternVin} />
      <StackNavigator.Screen name="Profil" component={Profil} />
    </StackNavigator.Navigator>
  );
}
