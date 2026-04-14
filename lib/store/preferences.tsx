"use client";
import * as React from "react";
import type { TastePreferences } from "@/lib/types";
import { defaultPreferences } from "@/lib/recommendations";

const KEY = "brewscovery:prefs";
const CONFIRMED_KEY = "brewscovery:age-confirmed";

interface Ctx {
  prefs: TastePreferences;
  setPrefs: (p: TastePreferences) => void;
  onboarded: boolean;
  setOnboarded: (b: boolean) => void;
  ageConfirmed: boolean;
  confirmAge: () => void;
}

const PreferencesContext = React.createContext<Ctx | null>(null);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [prefs, setPrefsState] = React.useState<TastePreferences>(defaultPreferences);
  const [onboarded, setOnboardedState] = React.useState(false);
  const [ageConfirmed, setAgeConfirmed] = React.useState(false);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setPrefsState(parsed.prefs ?? defaultPreferences);
        setOnboardedState(!!parsed.onboarded);
      }
      setAgeConfirmed(localStorage.getItem(CONFIRMED_KEY) === "1");
    } catch {}
    setHydrated(true);
  }, []);

  const setPrefs = (p: TastePreferences) => {
    setPrefsState(p);
    localStorage.setItem(KEY, JSON.stringify({ prefs: p, onboarded: true }));
  };
  const setOnboarded = (b: boolean) => {
    setOnboardedState(b);
    localStorage.setItem(KEY, JSON.stringify({ prefs, onboarded: b }));
  };
  const confirmAge = () => {
    localStorage.setItem(CONFIRMED_KEY, "1");
    setAgeConfirmed(true);
  };

  return (
    <PreferencesContext.Provider value={{ prefs, setPrefs, onboarded, setOnboarded, ageConfirmed, confirmAge }}>
      {hydrated ? children : null}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = React.useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used inside PreferencesProvider");
  return ctx;
}
