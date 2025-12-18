import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export const saveSettings = async ({ region, schoolYear }) => {
  try {
    await AsyncStorage.setItem('userRegion', region);
    await AsyncStorage.setItem('userSchoolYear', schoolYear);
  } catch (e) {
    console.error('Failed to save settings', e);
  }
};

export const loadSettings = async () => {
  try {
    const region = await AsyncStorage.getItem('userRegion');
    const schoolYear = await AsyncStorage.getItem('userSchoolYear');
    return {
      region: region || null,
      schoolYear: schoolYear || null,
    };
  } catch (e) {
    console.error('Failed to load settings', e);
    return { region: null, schoolYear: null };
  }
};

export const getDefaultRegion = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return 'midden'; 

    const location = await Location.getCurrentPositionAsync({});
    const { latitude } = location.coords;

    if (latitude > 52.5) return 'noord';
    if (latitude > 51.5) return 'midden';
    return 'zuid';
  } catch (e) {
    console.error('Failed to get location', e);
    return 'midden';
  }
};

export const getDefaultSchoolYear = () => {
  const now = new Date();
  const startYear = now.getFullYear();
  const endYear = startYear + 1;
  return `${startYear}-${endYear}`;
};
