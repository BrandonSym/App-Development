import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import TabNavigator from "./src/navigation/TabNavigator";
import { SettingsProvider } from "./src/context/SettingsContext";

export default function App() {
  useEffect(() => {
    // Hide the system navigation bar
    NavigationBar.setVisibilityAsync("hidden");

    // Set behavior so users can swipe up to reveal it
    NavigationBar.setBehaviorAsync("overlay-swipe");
  }, []);

  return (
    <SettingsProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SettingsProvider>
  );
}
