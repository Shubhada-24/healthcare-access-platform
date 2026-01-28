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
import { doctorAppointments, type Appointment } from "@/data/mock";
import {
  Activity,
  AlertTriangle,
  CalendarClock,
  MessageCircle,
  Pill,
  User2,
} from "lucide-react";
import Link from "next/link";

function severityConfig(severity: Appointment["severity"]) {
  switch (severity) {
    case "low":
      return { label: "Low", severity: "low" as const };
    case "medium":
      return { label: "Medium", severity: "medium" as const };
    case "high":
      return { label: "High", severity: "high" as const };
  }
}

export default function DoctorDashboard() {
  const total = doctorAppointments.length;
  const emergencies = doctorAppointments.filter(
    (a) => a.severity === "high"
  ).length;

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar activeRole="doctor" />
      <DashboardShell
        role="doctor"
        title="Doctor Dashboard"
        subtitle="Review today’s cases by risk level and jump into an appointment."
      >
        <section className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total patients</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
                {total}
              </span>
              <User2 className="h-5 w-5 text-emerald-500" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Cases today</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
                {total}
              </span>
              <CalendarClock className="h-5 w-5 text-sky-500" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Emergency cases</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-2xl font-semibold text-red-600 dark:text-red-400">
                {emergencies}
              </span>
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </CardContent>
          </Card>
        </section>

        <section id="appointments" className="grid gap-6 lg:grid-cols-[2fr,1.4fr]">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Today&apos;s appointments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {doctorAppointments.map((appt) => {
                const cfg = severityConfig(appt.severity);
                return (
                  <div
                    key={appt.id}
                    className="flex flex-col gap-2 rounded-xl border border-emerald-100/60 bg-white/70 p-3 text-sm shadow-sm dark:border-slate-800/80 dark:bg-slate-950/70"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/60 dark:text-violet-100">
                          <User2 className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-slate-50">
                            {appt.patientName}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {appt.time}
                          </p>
                        </div>
                      </div>
                      <Badge severity={cfg.severity}>{cfg.label} risk</Badge>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {appt.concern}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/doctor/appointment/${appt.id}`}>
                          <Activity className="mr-1.5 h-3.5 w-3.5" />
                          Open appointment
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="secondary">
                        <Link
                          href={`/doctor/appointment/${appt.id}?edit=prescription#prescription`}
                        >
                          <Pill className="mr-1.5 h-3.5 w-3.5" />
                          Add prescription
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="ghost">
                        <Link href={`/doctor/appointment/${appt.id}#chat`}>
                          <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                          Chat
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Risk categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 text-emerald-900 ring-1 ring-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-100 dark:ring-emerald-900/70">
                  <span>Low risk</span>
                  <span>Stable vitals · Routine follow-up</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-amber-50 px-3 py-2 text-amber-900 ring-1 ring-amber-100 dark:bg-amber-950/70 dark:text-amber-100 dark:ring-amber-900/70">
                  <span>Medium risk</span>
                  <span>Needs monitoring within 24–48 hrs</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-red-50 px-3 py-2 text-red-900 ring-1 ring-red-100 dark:bg-red-950/70 dark:text-red-100 dark:ring-red-900/70">
                  <span>High risk</span>
                  <span>Immediate escalation / ER referral</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Awareness content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <p className="text-slate-600 dark:text-slate-300">
                  Imagine this section lets doctors upload simple education:
                  short videos, WhatsApp posters, and translated instructions.
                </p>
                <ul className="space-y-2">
                  <li className="rounded-lg bg-white/80 px-3 py-2 ring-1 ring-emerald-100 dark:bg-slate-950/70 dark:ring-slate-800">
                    <span className="font-medium">
                      Heart attack early warning poster
                    </span>
                    <p className="text-[11px] text-slate-500">
                      Shared with high‑risk cardiac patients and ASHA workers.
                    </p>
                  </li>
                  <li className="rounded-lg bg-white/80 px-3 py-2 ring-1 ring-emerald-100 dark:bg-slate-950/70 dark:ring-slate-800">
                    <span className="font-medium">
                      2‑minute video in Hindi – &quot;How to take BP at home&quot;
                    </span>
                    <p className="text-[11px] text-slate-500">
                      Placeholder for hosted video link.
                    </p>
                  </li>
                </ul>
                <Button size="sm" variant="outline" className="w-full">
                  Upload tips / video (placeholder)
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </DashboardShell>
    </div>
  );
}

