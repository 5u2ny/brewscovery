import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-background/70">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 bg-gold/10 font-serif text-gold">
              B
            </span>
            <span className="font-serif text-lg">
              Brew<span className="text-gold">scovery</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Curated craft beer tasting, delivered. Smaller pours. Bigger discoveries.
          </p>
        </div>
        <FooterCol title="Explore">
          <FooterLink href="/discover">Catalog</FooterLink>
          <FooterLink href="/discovery-mix">Discovery Mix</FooterLink>
          <FooterLink href="/onboarding">Taste Quiz</FooterLink>
        </FooterCol>
        <FooterCol title="Account">
          <FooterLink href="/dashboard">My Cellar</FooterLink>
          <FooterLink href="/auth/sign-in">Sign in</FooterLink>
          <FooterLink href="/auth/sign-up">Create account</FooterLink>
        </FooterCol>
        <FooterCol title="Company">
          <FooterLink href="#">About</FooterLink>
          <FooterLink href="#">Breweries</FooterLink>
          <FooterLink href="#">Drink responsibly</FooterLink>
        </FooterCol>
      </div>
      <div className="border-t border-border/60">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} Brewscovery. Please drink responsibly.</span>
          <span>Crafted for the curious.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-cream">{title}</h4>
      <ul className="space-y-2 text-sm text-muted-foreground">{children}</ul>
    </div>
  );
}
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="transition-colors hover:text-gold">
        {children}
      </Link>
    </li>
  );
}
