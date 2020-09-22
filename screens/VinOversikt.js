import React from "react";
'import {Button, Text, View} from "react-native";
import * as firebase from 'firebase';

const VinOversikt = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyB9jZ8liTAnOmG9hSIren3p2rgLtTVckz8",
        authDomain: "vinkjeller-baeb3.firebaseapp.com",
        databaseURL: "https://vinkjeller-baeb3.firebaseio.com",
        projectId: "vinkjeller-baeb3",
        storageBucket: "vinkjeller-baeb3.appspot.com",
    };

    firebase.initializeApp(firebaseConfig);

    const pushData = () => {
        let childRef = firebase.database().ref("/wines").push();
        childRef.set({
            name: 'testvin',
            vintage: 2019,
            bought: 2020
        });
    };

    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text>Komponent for å vise oversikt over vinkjelleren</Text>
            <Button
                onPress={pushData}
                title="Push"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    );
};

export default VinOversikt;
