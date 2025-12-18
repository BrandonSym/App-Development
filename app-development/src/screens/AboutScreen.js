import { View, Text, StyleSheet, Image, useWindowDimensions, ScrollView } from "react-native";
import Layout from "../components/Layout";

const aboutImage = require("../assets/vacations/enorm knappe kerel.jpg");

export default function AboutScreen() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <Layout>
      <View
        style={[
          styles.container,
          isLandscape ? styles.containerLandscape : styles.containerPortrait,
        ]}
      >
        <Image
          source={aboutImage}
          style={[styles.image, isLandscape ? styles.imageLandscape : styles.imagePortrait]}
          resizeMode="contain"
        />

        <ScrollView contentContainerStyle={styles.textContainer}>
          <Text style={styles.header}>Brandon Symonowicz</Text>
          <Text style={styles.text}>
            Dit is de super koele vakantie app die ik heb gemaakt voor
            schoolvakanties in Nederland. Je kunt je regio en schooljaar
            instellen in de instellingen. De app haalt de vakantiedata op van
            een openbare API en toont je een overzicht van de vakanties voor
            jouw regio. Veel plezier met het plannen van je vakanties!
          </Text>
        </ScrollView>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  containerPortrait: {
    flexDirection: "column",
    alignItems: "center",
  },
  containerLandscape: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  image: {
    borderRadius: 12,
  },
  imagePortrait: {
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9,
    marginBottom: 16,
  },
  imageLandscape: {
    width: "40%",
    height: "80%",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
});
