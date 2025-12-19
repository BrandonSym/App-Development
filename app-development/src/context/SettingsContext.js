import { createContext, useState, useEffect } from "react";
import {
  loadSettings,
  saveSettings,
  getDefaultRegion,
  getDefaultSchoolYear,
} from "../utils/settings";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [region, setRegion] = useState(null);
  const [schoolYear, setSchoolYear] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const loadDefaults = async () => {
    const saved = await loadSettings();
    const defaultRegion = saved.region || (await getDefaultRegion());
    const defaultSchoolYear = saved.schoolYear || getDefaultSchoolYear();

    setRegion(defaultRegion);
    setSchoolYear(defaultSchoolYear);
    setLoaded(true);
  };

  const syncRegion = async () => {
    const detectedRegion = await getDefaultRegion();
    setRegion(detectedRegion);

    const saved = await loadSettings();
    await saveSettings({
      ...saved,
      region: detectedRegion,
    });

    return detectedRegion;
  };

  useEffect(() => {
    loadDefaults();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        region,
        setRegion,
        schoolYear,
        setSchoolYear,
        loaded,
        syncRegion,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
