import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OverzichtScreen from "../screens/OverzichtScreen";
import CountdownScreen from "../screens/CountdownScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AboutScreen from "../screens/AboutScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
    >
      <Tab.Screen name="Overzicht" component={OverzichtScreen} />
      <Tab.Screen name="Countdown" component={CountdownScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}
