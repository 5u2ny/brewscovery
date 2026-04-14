"use client";
import { PreferencesProvider } from "@/lib/store/preferences";
import { CartProvider } from "@/lib/store/cart";
import { AuthProvider } from "@/lib/store/auth";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <PreferencesProvider>
        <CartProvider>{children}</CartProvider>
      </PreferencesProvider>
    </AuthProvider>
  );
}
