"use client";
import * as React from "react";

export interface User {
  email: string;
  name: string;
  isAdmin?: boolean;
  subscription?: {
    packSlug: string;
    status: "active" | "paused" | "cancelled";
    nextShipment: string; // ISO date
  };
  favoriteBeerIds: string[];
  ratings: Record<string, number>;
}

const KEY = "brewscovery:user";

interface Ctx {
  user: User | null;
  signIn: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signUp: (email: string, password: string, name: string) => Promise<{ ok: boolean; error?: string }>;
  signOut: () => void;
  toggleFavorite: (beerId: string) => void;
  rateBeer: (beerId: string, rating: number) => void;
  setSubscription: (sub: User["subscription"]) => void;
}

const AuthContext = React.createContext<Ctx | null>(null);

function save(u: User | null) {
  if (u) localStorage.setItem(KEY, JSON.stringify(u));
  else localStorage.removeItem(KEY);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const signIn: Ctx["signIn"] = async (email, password) => {
    if (!email || !password) return { ok: false, error: "Enter an email and password." };
    const isAdmin = email.startsWith("admin@");
    const u: User = {
      email,
      name: email.split("@")[0],
      isAdmin,
      favoriteBeerIds: [],
      ratings: {},
    };
    setUser(u);
    save(u);
    return { ok: true };
  };
  const signUp: Ctx["signUp"] = async (email, password, name) => {
    if (!email || !password || !name) return { ok: false, error: "All fields required." };
    const u: User = { email, name, favoriteBeerIds: [], ratings: {} };
    setUser(u);
    save(u);
    return { ok: true };
  };
  const signOut = () => {
    setUser(null);
    save(null);
  };
  const toggleFavorite = (beerId: string) => {
    setUser((prev) => {
      if (!prev) return prev;
      const has = prev.favoriteBeerIds.includes(beerId);
      const next = {
        ...prev,
        favoriteBeerIds: has ? prev.favoriteBeerIds.filter((id) => id !== beerId) : [...prev.favoriteBeerIds, beerId],
      };
      save(next);
      return next;
    });
  };
  const rateBeer = (beerId: string, rating: number) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ratings: { ...prev.ratings, [beerId]: rating } };
      save(next);
      return next;
    });
  };
  const setSubscription = (sub: User["subscription"]) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, subscription: sub };
      save(next);
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, toggleFavorite, rateBeer, setSubscription }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
