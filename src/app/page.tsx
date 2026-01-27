import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TopBar } from "@/components/shell/top-bar";
import { HeartPulse, Stethoscope, User2, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-8 md:grid-cols-[1.4fr,1fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-3 py-1 text-xs font-medium text-emerald-900 ring-1 ring-emerald-400/40 dark:bg-emerald-900/60 dark:text-emerald-100">
              <HeartPulse className="h-3.5 w-3.5" />
              Prototype · User flow focused
            </div>
            <div className="space-y-3">
              <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl md:text-5xl dark:text-slate-50">
                Healthcare Access Platform
              </h1>
              <p className="max-w-xl text-balance text-sm text-slate-700 md:text-base dark:text-slate-300">
                Explore how patients, doctors, and ASHA workers coordinate care
                in one connected prototype. No real login or backend – just
                flows and dashboards.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <RoleCard
                icon={<User2 className="h-5 w-5" />}
                title="Login as Patient"
                description="Check symptoms, find nearby care, and chat with doctors."
                href="/patient"
                accent="from-sky-500/20 to-emerald-500/10"
              />
              <RoleCard
                icon={<Stethoscope className="h-5 w-5" />}
                title="Login as Doctor"
                description="View today’s cases, triage by severity, and send prescriptions."
                href="/doctor"
                accent="from-violet-500/20 to-emerald-500/10"
              />
              <RoleCard
                icon={<Users className="h-5 w-5" />}
                title="Login as Worker"
                description="Track high-risk families, visits, and government schemes."
                href="/worker"
                accent="from-amber-500/20 to-emerald-500/10"
              />
            </div>
          </div>

          <Card className="border-emerald-200/60 bg-gradient-to-b from-white/90 to-emerald-50/80 dark:border-emerald-900/70 dark:from-slate-950 dark:to-emerald-950/40">
            <CardHeader className="mb-4 flex items-center justify-between">
              <CardTitle>Prototype Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <ul className="space-y-2 text-slate-700 dark:text-slate-200">
                <li>• Explore dashboards for Patient, Doctor, and ASHA Worker.</li>
                <li>• Run a mock AI symptom check and see doctor suggestions.</li>
                <li>• Walk through simulated chat and prescription flows.</li>
                <li>• Review high-risk alerts and government scheme cards.</li>
              </ul>
              <div className="mt-4 grid gap-2 rounded-xl bg-white/80 p-3 text-xs text-slate-600 ring-1 ring-emerald-100 dark:bg-slate-950/60 dark:text-slate-300 dark:ring-emerald-900/60">
                <p className="font-medium text-slate-900 dark:text-slate-50">
                  This is a non-functional prototype.
                </p>
                <p>
                  All data, chats, AI outputs, and maps are mocked to focus only
                  on user journeys and information hierarchy.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

interface RoleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  accent: string;
}

function RoleCard({ icon, title, description, href, accent }: RoleCardProps) {
  return (
    <Card className="group relative overflow-hidden border-emerald-200/60 bg-white/80 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-400/80 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-950/80">
      <div
        className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${accent} opacity-0 transition-opacity group-hover:opacity-100`}
      />
      <CardHeader className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300/60 dark:bg-emerald-900/60 dark:text-emerald-100">
            {icon}
          </span>
          <CardTitle className="text-sm">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-xs text-slate-600 dark:text-slate-300">
          {description}
        </p>
        <Button asChild size="sm" className="mt-auto">
          <Link href={href}>Enter dashboard</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

