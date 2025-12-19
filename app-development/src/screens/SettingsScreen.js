import { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import Layout from "../components/Layout";
import { saveSettings } from "../utils/settings";
import { SettingsContext } from "../context/SettingsContext";
import { Picker } from "@react-native-picker/picker";
import { useWindowDimensions } from "react-native";
export default function SettingsScreen() {
  const { region, setRegion, schoolYear, setSchoolYear, loaded, syncRegion } =
    useContext(SettingsContext);
  const [localRegion, setLocalRegion] = useState(region);
  const [localSchoolYear, setLocalSchoolYear] = useState(schoolYear);

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const regions = ["noord", "midden", "zuid"];
  const currentYear = new Date().getFullYear();
  const schoolYears = Array.from(
    { length: 5 },
    (_, i) => `${currentYear + i}-${currentYear + i + 1}`
  );

  useEffect(() => {
    if (loaded) {
      setLocalRegion(region);
      setLocalSchoolYear(schoolYear);
    }
  }, [loaded]);

  const handleSave = async () => {
    if (!localRegion || !localSchoolYear) {
      Alert.alert("Error", "Please select both region and school year");
      return;
    }

    await saveSettings({ region: localRegion, schoolYear: localSchoolYear });
    setRegion(localRegion);
    setSchoolYear(localSchoolYear);
    Alert.alert("Saved!", "Your settings have been updated.");
  };

  return (
    <Layout>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingTop: isLandscape ? 16 : 80 },
        ]}
      >
        <Text style={styles.header}>Settings</Text>

        <Text style={styles.label}>Region:</Text>
        <View style={{ marginBottom: 24 }}>
          <Button
            title="Detect Region Automatically"
            onPress={async () => {
              const detected = await syncRegion();
              setLocalRegion(detected);
              Alert.alert("Region updated", `Detected region: ${detected}`);
            }}
          />
        </View>

        <Picker
          selectedValue={localRegion}
          onValueChange={setLocalRegion}
          style={styles.picker}
        >
          {regions.map((r) => (
            <Picker.Item key={r} label={r} value={r} />
          ))}
        </Picker>

        <Text style={styles.label}>School Year:</Text>
        <Picker
          selectedValue={localSchoolYear}
          onValueChange={setLocalSchoolYear}
          style={styles.picker}
        >
          {schoolYears.map((sy) => (
            <Picker.Item key={sy} label={sy} value={sy} />
          ))}
        </Picker>

        <View style={styles.buttonContainer}>
          <Button title="Save Settings" onPress={handleSave} />
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingTop: 80 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 24 },
  label: { fontSize: 16, marginBottom: 8, fontWeight: "600" },
  picker: { marginBottom: 24, backgroundColor: "#fff" },
  buttonContainer: { marginTop: 16 },
});
