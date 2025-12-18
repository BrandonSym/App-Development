// src/components/ResponsiveNavbar.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context"; // install this library

export default function ResponsiveNavbar() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const navigation = useNavigation();

  const tabs = ["Overzicht", "Countdown", "Settings", "About"];

  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]} // respect bottom safe area
      style={[
        styles.navbar,
        isLandscape ? styles.navbarLandscape : styles.navbarPortrait,
      ]}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => navigation.navigate(tab)}
          style={styles.tabButton}
        >
          <Text style={styles.tabText}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    backgroundColor: "#e2e8f0",
    zIndex: 100,
    left: 0,
  },
  navbarPortrait: {
    bottom: 0,
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  navbarLandscape: {
    top: 0,
    width: 140, // slightly wider for text
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  tabButton: {
    padding: 10,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
