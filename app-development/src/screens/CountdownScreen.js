import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Layout from "../components/Layout";
import { SettingsContext } from "../context/SettingsContext";
import capitalizeFirstLetter from "../utils/capitalizeFirst";
// Map vacation types to local images
const vacationImages = {
  Zomervakantie: require("../assets/vacations/summer.jpg"),
  Herfstvakantie: require("../assets/vacations/autumn.jpg"),
  Kerstvakantie: require("../assets/vacations/christmas.jpg"),
  Voorjaarsvakantie: require("../assets/vacations/spring.jpg"),
  Meivakantie: require("../assets/vacations/mei.jpg"),
};

export default function CountdownScreen() {
  const { region, schoolYear, loaded } = useContext(SettingsContext);
  const [nextVacation, setNextVacation] = useState(null);
  const [daysLeft, setDaysLeft] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loaded) return;

    const fetchVacations = async () => {
      try {
        const url = `https://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays/schoolyear/${schoolYear}?output=json`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`API returned ${res.status}`);

        const data = await res.json();
        const vacations = data.content?.[0]?.vacations || [];

        const regionVacations = vacations
          .map((vac) => {
            const regionsFiltered = vac.regions.filter(
              (r) =>
                r.region.toLowerCase() === region.toLowerCase() ||
                r.region.toLowerCase() === "heel nederland"
            );
            return { ...vac, regions: regionsFiltered };
          })
          .filter((v) => v.regions.length > 0)
          .flatMap((v) =>
            v.regions.map((r) => ({
              type: v.type.trim(),
              startdate: new Date(r.startdate),
              enddate: new Date(r.enddate),
            }))
          );

        // Find next upcoming vacation
        const today = new Date();
        const upcoming = regionVacations
          .filter((v) => v.startdate >= today)
          .sort((a, b) => a.startdate - b.startdate)[0];

        if (upcoming) {
          setNextVacation(upcoming);
          const diffTime = upcoming.startdate - today;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setDaysLeft(diffDays);
        } else {
          setNextVacation(null);
          setDaysLeft(null);
        }
      } catch (e) {
        console.error("Fetch error:", e);
        setError(e.message);
      }
    };

    fetchVacations();
  }, [region, schoolYear, loaded]);

  return (
    <Layout>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingTop: isLandscape ? 16 : 80 },
        ]}
      >
        <Text style={styles.header}>Countdown to Next Vacation</Text>
        {error && <Text style={styles.error}>{error}</Text>}

        {nextVacation ? (
          <View style={styles.card}>
            <Image
              source={vacationImages[nextVacation.type]}
              style={styles.vacationImage}
              resizeMode="cover"
            />
            <Text style={styles.cardTitle}>
              {nextVacation.type} {capitalizeFirstLetter(region)}
            </Text>
            <Text style={styles.periodText}>
              {`Start: ${nextVacation.startdate.toLocaleDateString()}`}
            </Text>
            <Text style={styles.periodText}>
              {`End: ${nextVacation.enddate.toLocaleDateString()}`}
            </Text>
            <Text style={styles.countdown}>{`${daysLeft} day${
              daysLeft !== 1 ? "s" : ""
            } left`}</Text>
          </View>
        ) : (
          <Text style={styles.noVacation}>
            No upcoming vacation found for your region.
          </Text>
        )}
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 80,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  error: {
    color: "red",
    marginBottom: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  vacationImage: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  periodText: {
    fontSize: 16,
    marginBottom: 4,
  },
  countdown: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "bold",
    color: "#1d4ed8",
  },
  noVacation: {
    fontSize: 16,
    color: "#555",
  },
});
