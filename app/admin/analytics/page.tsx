"use client";
import { Card } from "@/components/ui/card";

const retention = [
  { month: "Jan", rate: 78 },
  { month: "Feb", rate: 80 },
  { month: "Mar", rate: 83 },
  { month: "Apr", rate: 82 },
  { month: "May", rate: 85 },
  { month: "Jun", rate: 88 },
];

const conversion = [
  { stage: "Visitors", value: 12450 },
  { stage: "Quiz started", value: 4120 },
  { stage: "Quiz completed", value: 3180 },
  { stage: "Signed up", value: 1960 },
  { stage: "Subscribed", value: 1248 },
];

export default function AdminAnalytics() {
  const max = Math.max(...conversion.map((c) => c.value));
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h3 className="font-serif text-lg">Retention (last 6 months)</h3>
        <div className="mt-6 flex items-end gap-3 h-40">
          {retention.map((r) => (
            <div key={r.month} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md gradient-gold"
                style={{ height: `${r.rate}%` }}
                title={`${r.rate}%`}
              />
              <div className="text-xs text-muted-foreground">{r.month}</div>
              <div className="text-xs text-gold">{r.rate}%</div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-serif text-lg">Conversion funnel</h3>
        <div className="mt-6 space-y-3">
          {conversion.map((c) => (
            <div key={c.stage}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span>{c.stage}</span>
                <span className="text-gold">{c.value.toLocaleString()}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full gradient-gold" style={{ width: `${(c.value / max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
