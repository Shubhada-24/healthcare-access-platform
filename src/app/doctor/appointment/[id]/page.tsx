import { TopBar } from "@/components/shell/top-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { doctorAppointments, mockDoctorPatientChat } from "@/data/mock";
import {
  Activity,
  MessageCircle,
  Pill,
  Stethoscope,
  User2,
} from "lucide-react";
import { notFound } from "next/navigation";

export default function DoctorAppointmentPage({
  params,
}: {
  params: { id: string };
}) {
  const appointment = doctorAppointments.find((a) => a.id === params.id);
  if (!appointment) return notFound();

  const severityMap = {
    low: { label: "Low", severity: "low" as const },
    medium: { label: "Medium", severity: "medium" as const },
    high: { label: "High", severity: "high" as const },
  }[appointment.severity];

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar activeRole="doctor" />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
              Appointment prototype
            </p>
            <h1 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
              {appointment.patientName}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {appointment.time} · Chest pain pathway demo
            </p>
          </div>
          <Badge severity={severityMap.severity}>{severityMap.label} risk</Badge>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.4fr,1.6fr]">
          <Card>
            <CardHeader>
              <CardTitle>Patient details (mock)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-3 rounded-xl bg-white/70 p-3 ring-1 ring-emerald-100 dark:bg-slate-950/70 dark:ring-slate-800">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/60 dark:text-violet-100">
                  <User2 className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-50">
                    {appointment.patientName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    56 years · Male · Known hypertensive
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Presenting complaint
                </p>
                <p className="rounded-lg bg-slate-50 p-2 text-slate-700 ring-1 ring-slate-100 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-800">
                  {appointment.concern}
                </p>
              </div>
              <div className="grid gap-2 text-xs sm:grid-cols-3">
                <div className="rounded-lg bg-emerald-50 p-2 ring-1 ring-emerald-100 dark:bg-emerald-950/70 dark:ring-emerald-900/70">
                  <p className="font-medium text-emerald-900 dark:text-emerald-100">
                    Vitals
                  </p>
                  <p>BP 160/100 · Pulse 104 · SpO₂ 93%</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-2 ring-1 ring-amber-100 dark:bg-amber-950/70 dark:ring-amber-900/70">
                  <p className="font-medium text-amber-900 dark:text-amber-100">
                    Red flags
                  </p>
                  <p>Radiating pain, sweating, breathlessness.</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-2 ring-1 ring-slate-100 dark:bg-slate-900 dark:ring-slate-800">
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    Suggested action
                  </p>
                  <p>Immediate ER referral · ECG · cardiac enzymes.</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Prescription (demo only)
                </p>
                <div className="rounded-lg bg-white/80 p-2 text-xs ring-1 ring-emerald-100 dark:bg-slate-950/80 dark:ring-slate-800">
                  <p>
                    <span className="font-semibold">Tab Aspirin 150 mg</span> –
                    stat, then once daily.
                  </p>
                  <p>
                    <span className="font-semibold">Tab Atorvastatin 80 mg</span>{" "}
                    – at night.
                  </p>
                  <p>
                    <span className="font-semibold">
                      Immediate referral to nearest cath‑lab enabled centre.
                    </span>
                  </p>
                </div>
                <Button size="sm" variant="secondary" className="mt-1 w-full">
                  <Pill className="mr-1.5 h-3.5 w-3.5" />
                  Edit prescription (no save – for demo)
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Chat with patient (simulation)</CardTitle>
            </CardHeader>
            <CardContent className="flex h-[360px] flex-col gap-3 text-sm">
              <div className="flex-1 space-y-2 overflow-y-auto rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100 dark:bg-slate-950/70 dark:ring-slate-800">
                {mockDoctorPatientChat.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.from === "doctor"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-3 py-2 text-xs shadow-sm ${
                        msg.from === "doctor"
                          ? "rounded-br-sm bg-emerald-600 text-white dark:bg-emerald-500"
                          : "rounded-bl-sm bg-white text-slate-900 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-50 dark:ring-slate-700"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p
                        className={`mt-1 text-[10px] ${
                          msg.from === "doctor"
                            ? "text-emerald-100/80"
                            : "text-slate-400"
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/80 p-2 ring-1 ring-slate-100 dark:bg-slate-950/80 dark:ring-slate-800">
                <div className="flex-1 rounded-full bg-slate-50 px-3 py-2 text-xs text-slate-400 dark:bg-slate-900 dark:text-slate-500">
                  Type a message… (static for prototype)
                </div>
                <Button size="icon" variant="secondary" className="rounded-full">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                This chat is a fixed script to show the{" "}
                <span className="font-semibold">doctor → patient</span>{" "}
                experience. No real messages are sent.
              </p>
            </CardContent>
          </Card>
        </section>

        <footer className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <Stethoscope className="h-3 w-3" />
            <span>Doctor can escalate high‑risk patients directly to ER.</span>
          </div>
          <div className="flex items-center gap-1">
            <Activity className="h-3 w-3" />
            <span>No data is stored – this is a static flow.</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

