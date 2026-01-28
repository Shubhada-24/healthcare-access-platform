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
  governmentSchemes,
  workerPatients,
  mockWorkerPatientChat,
} from "@/data/mock";
import {
  AlertTriangle,
  ClipboardList,
  MessageCircle,
  User2,
} from "lucide-react";
import Link from "next/link";

export default function WorkerDashboard() {
  const highRisk = workerPatients.filter((p) => p.risk === "high").length;

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar activeRole="worker" />
      <DashboardShell
        role="worker"
        title="ASHA Worker Dashboard"
        subtitle="See assigned families, high‑risk alerts, and schemes to share."
        rightActions={<Badge severity="high">{highRisk} high‑risk patients</Badge>}
      >
        <section id="patients" className="grid gap-6 lg:grid-cols-[1.5fr,1.5fr]">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Assigned patients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {workerPatients.map((p) => (
                <Link
                  key={p.id}
                  href={`/worker/patient/${p.id}`}
                  className="flex items-center justify-between gap-3 rounded-xl bg-white/80 px-3 py-2 ring-1 ring-emerald-100 transition hover:bg-emerald-50 dark:bg-slate-950/70 dark:ring-slate-800 dark:hover:bg-emerald-950/70"
                >
                  <span className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-100">
                      <User2 className="h-4 w-4" />
                    </span>
                    <span>
                      <p className="text-xs font-medium text-slate-900 dark:text-slate-50">
                        {p.name}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {p.village} · Last visit {p.lastVisit}
                      </p>
                    </span>
                  </span>
                  <Badge severity={p.risk}>{p.risk.toUpperCase()} risk</Badge>
                </Link>
              ))}
            </CardContent>
          </Card>

          <div id="schemes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Government schemes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {governmentSchemes.map((scheme) => (
                  <div
                    key={scheme.id}
                    className="rounded-xl bg-white/80 p-3 ring-1 ring-emerald-100 dark:bg-slate-950/70 dark:ring-slate-800"
                  >
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                      {scheme.name}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {scheme.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Broadcast awareness (placeholder)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="text-slate-600 dark:text-slate-300">
                  Imagine sending one message to all mothers of newborns in your
                  area about vaccination dates or nutrition tips.
                </p>
                <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600 ring-1 ring-slate-100 dark:bg-slate-950/70 dark:text-slate-300 dark:ring-slate-800">
                  <p className="font-medium">Example broadcast message</p>
                  <p>
                    &quot;Tomorrow 10 AM free vaccination camp at Anganwadi
                    center. Please bring Mother and Child Protection card.&quot;
                  </p>
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  Draft broadcast (static)
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.5fr,1.5fr]">
          <Card>
            <CardHeader>
              <CardTitle>High‑risk alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-red-900 ring-1 ring-red-100 dark:bg-red-950/70 dark:text-red-100 dark:ring-red-900/70">
                <AlertTriangle className="mt-0.5 h-4 w-4" />
                <div>
                  <p className="text-xs font-semibold">
                    Chest pain case in Ward 5 flagged as high‑risk.
                  </p>
                  <p className="text-[11px]">
                    Visit within 2 hours or coordinate ambulance with doctor.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-amber-900 ring-1 ring-amber-100 dark:bg-amber-950/70 dark:text-amber-100 dark:ring-amber-900/70">
                <AlertTriangle className="mt-0.5 h-4 w-4" />
                <div>
                  <p className="text-xs font-semibold">
                    Missed BP visit – medium risk patient not reviewed for 3
                    weeks.
                  </p>
                  <p className="text-[11px]">
                    Add to tomorrow&apos;s visit plan and share BP education
                    poster.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Example worker ↔ patient chat</CardTitle>
              <Badge severity="low">Static conversation</Badge>
            </CardHeader>
            <CardContent className="flex h-[260px] flex-col gap-3 text-sm">
              <div className="flex-1 space-y-2 overflow-y-auto rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100 dark:bg-slate-950/70 dark:ring-slate-800">
                {mockWorkerPatientChat.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.from === "worker" ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-3 py-2 text-xs shadow-sm ${
                        msg.from === "worker"
                          ? "rounded-bl-sm bg-white text-slate-900 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-50 dark:ring-slate-700"
                          : "rounded-br-sm bg-emerald-600 text-white dark:bg-emerald-500"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p
                        className={`mt-1 text-[10px] ${
                          msg.from === "worker"
                            ? "text-slate-400"
                            : "text-emerald-100/80"
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-white/80 p-2 ring-1 ring-slate-100 dark:bg-slate-950/80 dark:ring-slate-800">
                <div className="flex-1 rounded-full bg-slate-50 px-3 py-2 text-xs text-slate-400 dark:bg-slate-900 dark:text-slate-500">
                  Type a message… (demo only)
                </div>
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full"
                >
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Demonstrates how ASHA workers can nudge medicine adherence and
                visit planning.
              </p>
            </CardContent>
          </Card>
        </section>

        <footer className="mt-1 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <ClipboardList className="h-3 w-3" />
          <span>
            Flow to explore: Worker opens a high‑risk patient → reviews notes →
            checks relevant schemes.
          </span>
        </footer>
      </DashboardShell>
    </div>
  );
}

