"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/store/auth";

export default function SignInPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await signIn(String(form.get("email")), String(form.get("password")));
    if (!res.ok) setError(res.error ?? "Sign-in failed.");
    else router.push("/dashboard");
  }

  return (
    <div className="container max-w-md py-20">
      <Card className="p-8">
        <h1 className="font-serif text-3xl">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to manage your cellar.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div><Label>Email</Label><Input name="email" type="email" required placeholder="you@example.com" /></div>
          <div><Label>Password</Label><Input name="password" type="password" required /></div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full">Sign in</Button>
        </form>
        <p className="mt-5 text-center text-xs text-muted-foreground">
          Tip: sign in with <span className="text-gold">admin@brewscovery.com</span> to access the admin dashboard.
        </p>
        <p className="mt-4 text-center text-sm">
          New here? <Link href="/auth/sign-up" className="text-gold hover:underline">Create an account</Link>
        </p>
      </Card>
    </div>
  );
}
