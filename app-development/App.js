import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import TabNavigator from "./src/navigation/TabNavigator";
import { SettingsProvider } from "./src/context/SettingsContext";

export default function App() {
  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");

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
