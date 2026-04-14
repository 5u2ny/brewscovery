"use client";
import * as React from "react";
import { usePreferences } from "@/lib/store/preferences";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function AgeGate() {
  const { ageConfirmed, confirmAge } = usePreferences();
  const [open, setOpen] = React.useState(!ageConfirmed);

  React.useEffect(() => setOpen(!ageConfirmed), [ageConfirmed]);

  return (
    <Dialog open={open}>
      <DialogContent hideClose className="max-w-md border-gold/30">
        <div className="space-y-1 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold font-serif text-lg">
            B
          </div>
          <DialogTitle className="text-2xl">Welcome to Brewscovery</DialogTitle>
          <DialogDescription>
            Please confirm you are of legal drinking age in your region.
          </DialogDescription>
        </div>
        <div className="mt-4 flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              window.location.href = "https://www.responsibility.org";
            }}
          >
            I'm under 21
          </Button>
          <Button
            className="flex-1"
            onClick={() => {
              confirmAge();
              setOpen(false);
            }}
          >
            I'm 21 or older
          </Button>
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Please drink responsibly. Brewscovery supports responsible consumption.
        </p>
      </DialogContent>
    </Dialog>
  );
}
