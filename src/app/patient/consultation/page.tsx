import { TopBar } from "@/components/shell/top-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockDoctorPatientChat } from "@/data/mock";
import {
  CalendarClock,
  MessageCircle,
  Stethoscope,
  Video,
} from "lucide-react";

export default function PatientConsultation() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar activeRole="patient" />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
              Consultation prototype
            </p>
            <h1 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
              Suggested doctors & chat
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              This screen shows what happens after a high‑risk AI result.
            </p>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.4fr,1.6fr]">
          <Card>
            <CardHeader>
              <CardTitle>Recommended doctors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <DoctorSuggestion
                name="Dr. Meera Rao"
                speciality="Cardiologist"
                location="District Hospital · 2.3 km"
                badge="High priority from AI"
              />
              <DoctorSuggestion
                name="Dr. Arjun Patel"
                speciality="General Physician"
                location="Community Health Center · 1.1 km"
                badge="Backup option"
              />
              <Button className="mt-2 w-full">
                <CalendarClock className="mr-1.5 h-4 w-4" />
                Book appointment (dummy)
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Chat simulation (WhatsApp style)</CardTitle>
              <Badge severity="medium">Fixed script</Badge>
            </CardHeader>
            <CardContent className="flex h-[360px] flex-col gap-3 text-sm">
              <div className="flex-1 space-y-2 overflow-y-auto rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100 dark:bg-slate-950/70 dark:ring-slate-800">
                {mockDoctorPatientChat.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.from === "doctor"
                        ? "justify-start"
                        : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-3 py-2 text-xs shadow-sm ${
                        msg.from === "doctor"
                          ? "rounded-bl-sm bg-white text-slate-900 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-50 dark:ring-slate-700"
                          : "rounded-br-sm bg-emerald-600 text-white dark:bg-emerald-500"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p
                        className={`mt-1 text-[10px] ${
                          msg.from === "doctor"
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
                  Type a message… (not connected)
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
                This shows the{" "}
                <span className="font-semibold">patient → doctor</span> chat
                experience with WhatsApp‑like bubbles and time stamps.
              </p>
            </CardContent>
          </Card>
        </section>

        <footer className="mt-1 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <Video className="h-3 w-3" />
          <span>
            Future extensions could add call buttons and video consult tiles.
            For now, they are placeholders.
          </span>
        </footer>
      </main>
    </div>
  );
}

interface DoctorSuggestionProps {
  name: string;
  speciality: string;
  location: string;
  badge: string;
}

function DoctorSuggestion({
  name,
  speciality,
  location,
  badge,
}: DoctorSuggestionProps) {
  return (
    <div className="space-y-2 rounded-xl bg-white/80 p-3 ring-1 ring-emerald-100 dark:bg-slate-950/70 dark:ring-slate-800">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
            {name}
          </p>
          <p className="text-xs text-slate-500">{speciality}</p>
        </div>
        <Badge severity="low">{badge}</Badge>
      </div>
      <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
        <span className="flex items-center gap-1">
          <Stethoscope className="h-3.5 w-3.5" />
          {location}
        </span>
        <span>Est. wait: 20–30 min</span>
      </div>
    </div>
  );
}

