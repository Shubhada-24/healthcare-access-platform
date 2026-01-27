import { TopBar } from "@/components/shell/top-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockWorkerPatientChat, workerPatients } from "@/data/mock";
import { ClipboardList, MessageCircle, NotebookPen } from "lucide-react";
import { notFound } from "next/navigation";

export default function WorkerPatientView({
  params,
}: {
  params: { id: string };
}) {
  const patient = workerPatients.find((p) => p.id === params.id);
  if (!patient) return notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar activeRole="worker" />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
              Worker → patient view
            </p>
            <h1 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
              {patient.name}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {patient.village} · Last visit {patient.lastVisit}
            </p>
          </div>
          <Badge severity={patient.risk}>{patient.risk.toUpperCase()} risk</Badge>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.4fr,1.6fr]">
          <Card>
            <CardHeader>
              <CardTitle>Visit notes (prototype)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="space-y-1 text-xs">
                <p className="font-medium text-slate-700 dark:text-slate-200">
                  Previous visits
                </p>
                <ul className="space-y-1">
                  <li className="rounded-lg bg-slate-50 px-2 py-1 ring-1 ring-slate-100 dark:bg-slate-950/70 dark:ring-slate-800">
                    02 Jan: Home visit, BP 160/100, explained salt reduction,
                    referred to doctor.
                  </li>
                  <li className="rounded-lg bg-slate-50 px-2 py-1 ring-1 ring-slate-100 dark:bg-slate-950/70 dark:ring-slate-800">
                    15 Dec: Follow‑up call, medicines continued, no chest pain.
                  </li>
                </ul>
              </div>
              <div className="space-y-1 text-xs">
                <p className="font-medium text-slate-700 dark:text-slate-200">
                  Today&apos;s notes
                </p>
                <textarea
                  className="min-h-[120px] w-full rounded-xl border border-emerald-200 bg-white/80 p-3 text-xs text-slate-900 shadow-sm outline-none ring-emerald-500/0 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-50"
                  placeholder="Example: Discussed diet, checked BP, educated family about warning signs..."
                  defaultValue="Prototype only: notes are not saved."
                />
                <Button size="sm" className="mt-1 w-full">
                  <NotebookPen className="mr-1.5 h-3.5 w-3.5" />
                  Save notes (not actually stored)
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Chat with patient (demo)</CardTitle>
              <Badge severity="low">Static script</Badge>
            </CardHeader>
            <CardContent className="flex h-[320px] flex-col gap-3 text-sm">
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
                  Type a message… (no backend)
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
                Prototype shows how ASHA workers can reassure, remind medicines,
                and coordinate visits.
              </p>
            </CardContent>
          </Card>
        </section>

        <footer className="mt-1 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <ClipboardList className="h-3 w-3" />
          <span>
            Worker flow: review history → add new notes → send simple message or
            scheme details.
          </span>
        </footer>
      </main>
    </div>
  );
}

