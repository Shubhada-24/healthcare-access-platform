"use client";

import { TopBar } from "@/components/shell/top-bar";
import { DashboardShell } from "@/components/shell/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  awarenessVideos,
  nearestServices,
  patientReminders,
} from "@/data/mock";
import {
  AlertTriangle,
  Hospital,
  MapPin,
  MessageCircleMore,
  Pill,
  Stethoscope,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PatientDashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar activeRole="patient" />
      <DashboardShell
        role="patient"
        title="Patient Dashboard"
        subtitle="Start with a quick symptom check, then see nearby services and reminders."
        rightActions={
          <Button asChild size="sm" variant="secondary">
            <Link href="/patient/consultation">
              <MessageCircleMore className="mr-1.5 h-3.5 w-3.5" />
              Consultation
            </Link>
          </Button>
        }
      >
        <section className="grid gap-6 lg:grid-cols-[1.6fr,1.2fr]">
          <Card id="symptoms" className="scroll-mt-24">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>AI Symptom Checker (mock)</CardTitle>
              <Badge severity="medium">Rule-based demo</Badge>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p className="text-slate-600 dark:text-slate-300">
                Enter symptoms like{" "}
                <span className="font-medium">
                  &quot;chest pain, sweating, breathless&quot;
                </span>{" "}
                to trigger a high-risk recommendation.
              </p>
              <SymptomCheckerForm />
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card id="services" className="scroll-mt-24">
              <CardHeader>
                <CardTitle>Nearest services (simulated)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {nearestServices.map((service) => (
                  <button
                    key={service.id}
                    className="flex w-full items-center justify-between gap-3 rounded-xl bg-white/80 px-3 py-2 text-left text-slate-800 ring-1 ring-emerald-100 transition hover:-translate-y-0.5 hover:bg-emerald-50 hover:shadow-sm dark:bg-slate-950/70 dark:text-slate-100 dark:ring-slate-800 dark:hover:bg-emerald-950/60"
                  >
                    <span className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-100">
                        <MapPin className="h-4 w-4" />
                      </span>
                      <span className="text-xs font-medium">{service.label}</span>
                    </span>
                    <Badge severity="low">{service.type}</Badge>
                  </button>
                ))}
                <p className="pt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  Map tiles are not loaded – this view assumes static nearest services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reminders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {patientReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-slate-800 ring-1 ring-slate-100 dark:bg-slate-950/70 dark:text-slate-100 dark:ring-slate-800"
                  >
                    <div>
                      <p className="text-xs font-medium">{reminder.title}</p>
                      <p className="text-[11px] text-slate-500">
                        {reminder.time}
                      </p>
                    </div>
                    <Pill className="h-4 w-4 text-emerald-500" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Awareness videos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {awarenessVideos.map((video) => (
                  <div
                    key={video.id}
                    className="flex items-center justify-between rounded-xl bg-white/80 px-3 py-2 ring-1 ring-emerald-100 dark:bg-slate-950/70 dark:ring-slate-800"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-700 dark:bg-sky-900/60 dark:text-sky-100">
                        <Video className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-xs font-medium">{video.title}</p>
                        <p className="text-[11px] text-slate-500">
                          {video.duration} · placeholder
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Watch
                    </Button>
                  </div>
                ))}
                <p className="flex items-center gap-1 pt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <AlertTriangle className="h-3 w-3 text-amber-500" />
                  Content is illustrative only, no real video stream.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <footer className="mt-1 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <Hospital className="h-3 w-3" />
          <span>
            Flow to explore: run symptom checker → see AI result → continue to consultation.
          </span>
        </footer>
      </DashboardShell>
    </div>
  );
}

function SymptomCheckerForm() {
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);

  const result = getMockResult(input);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setChecked(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setChecked(false);
        }}
        className="min-h-[96px] w-full rounded-xl border border-emerald-200 bg-white/80 p-3 text-sm text-slate-900 shadow-sm outline-none ring-emerald-500/0 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-50"
        placeholder="Describe your symptoms in your own words..."
      />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          This checker is{" "}
          <span className="font-semibold">rule-based</span>, not a real AI
          model.
        </p>
        <Button size="sm" type="submit">
          Run symptom check
        </Button>
      </div>

      {checked && (
        <div className="space-y-2 rounded-xl bg-slate-50 p-3 text-xs ring-1 ring-slate-100 dark:bg-slate-950/70 dark:ring-slate-800">
          <div className="flex items-center justify-between">
            <span className="font-medium text-slate-900 dark:text-slate-50">
              Mock AI result
            </span>
            <Badge severity={result.severity}>{result.severityLabel}</Badge>
          </div>
          <p className="text-slate-700 dark:text-slate-200">
            Suggested speciality:{" "}
            <span className="font-medium">{result.specialist}</span>
          </p>
          <ul className="list-disc pl-4 text-slate-600 dark:text-slate-300">
            {result.remedies.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
          <Button
            asChild
            size="sm"
            variant="secondary"
            className="mt-1 w-full"
          >
            <Link href="/patient/consultation">
              <Stethoscope className="mr-1.5 h-3.5 w-3.5" />
              Continue to doctor recommendation
            </Link>
          </Button>
        </div>
      )}
    </form>
  );
}

function getMockResult(input: string) {
  const text = input.toLowerCase();
  if (
    text.includes("chest pain") ||
    text.includes("breathless") ||
    text.includes("short of breath")
  ) {
    return {
      severity: "high" as const,
      severityLabel: "High",
      specialist: "Cardiologist / Emergency physician",
      remedies: [
        "Do not travel alone or wait at home.",
        "Call emergency number 108 or local ambulance.",
        "Avoid food and water until doctor advises.",
      ],
    };
  }
  if (text.includes("fever") || text.includes("cough")) {
    return {
      severity: "medium" as const,
      severityLabel: "Medium",
      specialist: "General physician",
      remedies: [
        "Drink plenty of fluids and rest.",
        "Monitor temperature every 6 hours.",
        "Visit nearby clinic within 24 hours.",
      ],
    };
  }
  if (!text.trim()) {
    return {
      severity: "low" as const,
      severityLabel: "Low",
      specialist: "Not enough information",
      remedies: [
        "Describe your main symptom, duration, and any diseases you already have.",
      ],
    };
  }
  return {
    severity: "low" as const,
    severityLabel: "Low",
    specialist: "Family doctor / teleconsultation",
    remedies: [
      "Track symptoms for 24–48 hours.",
      "If symptoms worsen, contact a doctor or ASHA worker.",
    ],
  };
}

