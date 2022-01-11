import React, { useEffect, useState } from "react";
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
import { InteractionManager, Platform, StatusBar } from "react-native";
import StrekkodeScanner from "./screens/StrekkodeScanner";
import EksternVin from "./screens/EksternVin/EksternVin";
import Login from "./screens/Bruker/Login";
import Signup from "./screens/Bruker/Signup";
import IkonKnapp from "./components/knapp/IkonKnapp";
import Profil from "./screens/Bruker/Profil";
import GlemtPassord from "./screens/Bruker/GlemtPassord";
import NullstillPassord from "./screens/Bruker/NullstillPassord";
import Personvern from "./screens/Bruker/Personvern";
import Brukerintroduksjon from "./screens/Brukerintroduksjon/Brukerintroduksjon";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export default function App() {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  };
  const [visIntroduksjon, setVisIntroduksjon] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  //TODO: Dette måtte legges på ifm. overgang til EAS. Bør kunne fjernes etterhvert.
  StatusBar.setBarStyle("dark-content");

  if (Platform.OS === "android") {
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor("transparent");
  }

  useEffect(() => {
    AsyncStorage.getItem("visIntroduksjon").then(value => {
      if (value !== null) {
        setVisIntroduksjon(false);
      } else {
        setVisIntroduksjon(true);
      }
    });
  }, []);

  firebase.auth().onAuthStateChanged(function(user) {
    setUser(user);
    setIsLoading(false);
  });

  if (isLoading || visIntroduksjon === null) {
    return null;
  }
  if (visIntroduksjon) {
    return (
      <Brukerintroduksjon
        visIntroduksjon={value => setVisIntroduksjon(value)}
      />
    );
  }
  if (user === null) {
    return (
      <NavigationContainer>
        <StackNavigator.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.primaryBg,
              borderBottomWidth: 0
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
          <StackNavigator.Screen
            options={{ title: "Glemt passord" }}
            name="GlemtPassord"
            component={GlemtPassord}
          />
          <StackNavigator.Screen
            options={{ title: "Glemt passord" }}
            name="NullstillPassord"
            component={NullstillPassord}
          />
          <StackNavigator.Screen
            options={{ title: "Personvernerklæring og vilkår" }}
            name="Personvern"
            component={Personvern}
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
          elevation: 0,
          shadowColor: 'transparent'
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
        options={{ title: "Resultater" }}
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
          backgroundColor: colors.primaryBg,
          shadowColor: 'transparent'
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
          backgroundColor: colors.primaryBg,
          shadowColor: 'transparent'
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
      <StackNavigator.Screen
        options={{ title: "Personvern og vilkår" }}
        name="Personvern"
        component={Personvern}
      />
    </StackNavigator.Navigator>
  );
}
