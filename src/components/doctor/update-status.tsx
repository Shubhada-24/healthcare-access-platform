"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, Loader2, Send } from "lucide-react";
import { useState } from "react";

const STATUS_OPTIONS = [
  { value: "scheduled", label: "Scheduled", icon: Clock },
  { value: "in_progress", label: "In progress", icon: Loader2 },
  { value: "completed", label: "Completed", icon: CheckCircle2 },
  { value: "referred", label: "Referred", icon: Send },
] as const;

type StatusValue = (typeof STATUS_OPTIONS)[number]["value"];

export function UpdateStatus() {
  const [currentStatus, setCurrentStatus] = useState<StatusValue>("scheduled");
  const [lastUpdated, setLastUpdated] = useState<StatusValue | null>(null);

  const handleUpdate = (status: StatusValue) => {
    setCurrentStatus(status);
    setLastUpdated(status);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p className="text-xs text-slate-600 dark:text-slate-300">
          Current appointment status (demo – not saved)
        </p>
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map(({ value, label, icon: Icon }) => (
            <Button
              key={value}
              size="sm"
              variant={currentStatus === value ? "default" : "outline"}
              className="capitalize"
              onClick={() => handleUpdate(value)}
            >
              <Icon className="mr-1.5 h-3.5 w-3.5" />
              {label}
            </Button>
          ))}
        </div>
        {lastUpdated && (
          <p className="rounded-lg bg-emerald-50 px-2 py-1.5 text-xs text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-100">
            Status set to &quot;{STATUS_OPTIONS.find((s) => s.value === lastUpdated)?.label}&quot;. In a real app this would be saved.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
