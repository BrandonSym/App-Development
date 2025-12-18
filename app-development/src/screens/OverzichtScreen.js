import { useEffect, useState, useContext } from "react";
import { View, Text, ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import Layout from "../components/Layout";
import { SettingsContext } from "../context/SettingsContext";
import capitalizeFirstLetter from "../utils/capitalizeFirst"; 

export default function OverzichtScreen() {
  const { region, schoolYear, loaded } = useContext(SettingsContext);
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  useEffect(() => {
    if (!loaded) return;

    const fetchHolidaysForUser = async () => {
      setLoading(true);
      try {
        const url = `https://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays/schoolyear/${schoolYear}?output=json`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`API returned ${res.status}`);

        const data = await res.json();
        const content = data.content?.[0]?.vacations || [];

        const filtered = content
          .map((vacation) => {
            const regionsFiltered = vacation.regions.filter((r) => {
              const regionName = r.region.toLowerCase().trim();
              return regionName === region.toLowerCase() || regionName === "heel nederland";
            });
            return { ...vacation, regions: regionsFiltered };
          })
          .filter((v) => v.regions.length > 0);

        setHolidays(filtered);
      } catch (e) {
        console.error("Fetch error:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHolidaysForUser();
  }, [region, schoolYear, loaded]);

  return (
    <Layout>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingTop: isLandscape ? 16 : 80 },
        ]}
      >
        <Text style={styles.header}>Schoolvakanties {capitalizeFirstLetter(region)} {schoolYear}</Text>

        {loading && <Text>Loading...</Text>}
        {error && <Text style={styles.error}>{error}</Text>}

        {holidays.map((item, idx) => (
          <View key={idx} style={styles.card}>
            <Text style={styles.cardTitle}>{item.type.trim()}</Text>
            {item.regions.map((r, i) => (
              <Text key={i} style={styles.periodText}>
                {`${capitalizeFirstLetter(r.region.trim())}: ${new Date(r.startdate).toLocaleDateString()} → ${new Date(
                  r.enddate
                ).toLocaleDateString()}`}
              </Text>
            ))}
          </View>
        ))}

        {!loading && holidays.length === 0 && (
          <Text style={styles.noVacation}>No vacations found for your region.</Text>
        )}
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  error: { color: "red", marginBottom: 16 },
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: { fontSize: 18, fontWeight: "600", marginBottom: 4 },
  periodText: { fontSize: 14, marginTop: 2 },
  noVacation: { fontSize: 16, color: "#555" },
});
