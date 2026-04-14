"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/store/auth";

export default function SignUpPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await signUp(
      String(form.get("email")),
      String(form.get("password")),
      String(form.get("name"))
    );
    if (!res.ok) setError(res.error ?? "Sign-up failed.");
    else router.push("/onboarding");
  }

  return (
    <div className="container max-w-md py-20">
      <Card className="p-8">
        <h1 className="font-serif text-3xl">Join Brewscovery</h1>
        <p className="mt-1 text-sm text-muted-foreground">Create your account to start tasting.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div><Label>Name</Label><Input name="name" required /></div>
          <div><Label>Email</Label><Input name="email" type="email" required /></div>
          <div><Label>Password</Label><Input name="password" type="password" required /></div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full">Create account</Button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have one? <Link href="/auth/sign-in" className="text-gold hover:underline">Sign in</Link>
        </p>
      </Card>
    </div>
  );
}
