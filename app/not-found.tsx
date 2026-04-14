import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="font-serif text-7xl text-gold">404</div>
      <h1 className="mt-3 font-serif text-3xl">This pour isn't on the menu.</h1>
      <p className="mt-2 text-muted-foreground">The page you're looking for doesn't exist.</p>
      <Button asChild className="mt-6"><Link href="/">Back to home</Link></Button>
    </div>
  );
}
