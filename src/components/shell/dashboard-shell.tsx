"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  HeartPulse,
  LayoutDashboard,
  Stethoscope,
  Users,
  MessageCircle,
  ClipboardList,
  MapPin,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

type Role = "patient" | "doctor" | "worker";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

function roleNav(role: Role): NavItem[] {
  switch (role) {
    case "patient":
      return [
        { href: "/patient", label: "Dashboard", icon: LayoutDashboard },
        { href: "/patient#symptoms", label: "Symptom checker", icon: Sparkles },
        { href: "/patient#services", label: "Nearest services", icon: MapPin },
        { href: "/patient/consultation", label: "Consultation", icon: MessageCircle },
      ];
    case "doctor":
      return [
        { href: "/doctor", label: "Dashboard", icon: LayoutDashboard },
        { href: "/doctor#appointments", label: "Appointments", icon: ClipboardList },
      ];
    case "worker":
      return [
        { href: "/worker", label: "Dashboard", icon: LayoutDashboard },
        { href: "/worker#patients", label: "Assigned patients", icon: Users },
        { href: "/worker#schemes", label: "Schemes", icon: ShieldCheck },
      ];
  }
}

export function DashboardShell({
  role,
  title,
  subtitle,
  children,
  rightActions,
}: {
  role: Role;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  rightActions?: React.ReactNode;
}) {
  const pathname = usePathname();
  const nav = roleNav(role);

  const roleIcon =
    role === "patient" ? HeartPulse : role === "doctor" ? Stethoscope : Users;
  const RoleIcon = roleIcon;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <aside className="hidden w-[240px] shrink-0 md:block">
        <div className="sticky top-[72px] space-y-3">
          <div className="rounded-2xl border border-emerald-100 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/60">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-2xl text-white shadow-sm",
                  role === "patient" &&
                    "bg-gradient-to-br from-sky-500 to-emerald-500",
                  role === "doctor" &&
                    "bg-gradient-to-br from-violet-500 to-emerald-500",
                  role === "worker" &&
                    "bg-gradient-to-br from-amber-500 to-emerald-500"
                )}
              >
                <RoleIcon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-950 dark:text-slate-50">
                  {role === "patient" && "Patient"}
                  {role === "doctor" && "Doctor"}
                  {role === "worker" && "ASHA Worker"}
                </p>
                <p className="truncate text-xs text-slate-600 dark:text-slate-300">
                  Quick navigation
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-1">
              {nav.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href.includes("#") && pathname === item.href.split("#")[0]);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition",
                      active
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "text-slate-700 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-emerald-950/60"
                    )}
                  >
                    <Icon className={cn("h-4 w-4", active && "text-white")} />
                    <span className="text-xs font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white/70 p-4 text-xs text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
            <p className="font-semibold text-slate-900 dark:text-slate-50">
              Tip
            </p>
            <p className="mt-1">
              This is a clickable demo. Data and chat are simulated locally.
            </p>
            <Button asChild size="sm" variant="outline" className="mt-3 w-full">
              <Link href="/">Switch role</Link>
            </Button>
          </div>
        </div>
      </aside>

      <section className="min-w-0 flex-1 space-y-4">
        <header className="rounded-2xl border border-emerald-100 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/60">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
                {role} flow
              </p>
              <h1 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-slate-50">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {subtitle}
                </p>
              )}
            </div>
            {rightActions && <div className="flex items-center gap-2">{rightActions}</div>}
          </div>
        </header>

        <div className="space-y-6">{children}</div>
      </section>
    </div>
  );
}

