import React, { useRef } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { slides } from "./Slides";
import { Image, Text, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Brukerintroduksjon = ({ visIntroduksjon }) => {
  const ref = useRef(0);
  const onDone = () => {
    AsyncStorage.setItem("visIntroduksjon", "false");
    visIntroduksjon(false);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <Text style={[styles.title, item.titleStyle]}>{item.title}</Text>
        {item.image && (
          <Image style={[styles.image, item.imageStyle]} source={item.image} />
        )}
        <View style={{ minHeight: 50 }}>
          <Text style={[styles.text, item.textStyle]}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <AppIntroSlider
      renderItem={renderItem}
      onSlideChange={index => {
        ref.current = index;
      }}
      data={slides}
      onDone={onDone}
      showSkipButton
      activeDotStyle={{
        backgroundColor: "gray"
      }}
      renderNextButton={() => (
        <View>
          <Text
            style={[
              styles.knapp,
              {
                color:
                  ref.current === 3 || ref.current === 4 ? "black" : "white"
              }
            ]}
          >
            Neste
          </Text>
        </View>
      )}
      renderDoneButton={() => (
        <View>
          <Text style={[styles.knapp, { color: "black" }]}>Ferdig!</Text>
        </View>
      )}
      renderSkipButton={() => (
        <View>
          <Text
            style={[
              styles.knapp,
              {
                color:
                  ref.current === 3 || ref.current === 4 ? "black" : "white"
              }
            ]}
          >
            Hopp over
          </Text>
        </View>
      )}
    />
  );
};

export default Brukerintroduksjon;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 320,
    height: 400,
    resizeMode: "contain",
    marginVertical: 32
  },
  text: {
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginLeft: 40,
    marginRight: 40
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center"
  },
  knapp: {
    padding: 13,
    fontSize: 14
  }
});
