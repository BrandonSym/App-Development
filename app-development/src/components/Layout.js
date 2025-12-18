// src/components/Layout.js
import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import ResponsiveNavbar from "./ResponsiveNavbar";

export default function Layout({ children }) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isLandscape = width > height;

  const bottomNavbarHeight = isLandscape ? 0 : 60;
  const leftNavbarWidth = isLandscape ? 140 : 0;

  return (
    <SafeAreaView style={styles.safe}>
      <View
        style={{
          flex: 1,
          marginBottom: bottomNavbarHeight,
          marginLeft: leftNavbarWidth,
          marginTop: insets.top,
          marginRight: insets.right,
        }}
      >
        {children}
      </View>

      {/* Render the navbar on top of everything */}
      <ResponsiveNavbar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
});
