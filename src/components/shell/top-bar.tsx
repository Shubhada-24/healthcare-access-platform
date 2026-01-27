"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Stethoscope, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Role = "patient" | "doctor" | "worker" | null;

interface TopBarProps {
  activeRole?: Role;
}

export function TopBar({ activeRole }: TopBarProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (typeof document === "undefined") return;
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    if (typeof document === "undefined") return;
    const isDark = document.documentElement.classList.toggle("dark");
    setTheme(isDark ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-20 border-b border-emerald-100/60 bg-emerald-50/70 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md dark:bg-emerald-500">
            <Stethoscope className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold tracking-tight text-emerald-950 dark:text-emerald-50">
              Healthcare Access Platform
            </p>
            <p className="text-xs text-emerald-900/70 dark:text-emerald-100/70">
              Connected care for every role
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2 text-xs sm:text-sm">
          {activeRole && (
            <span
              className={cn(
                "hidden rounded-full bg-emerald-100/80 px-3 py-1 font-medium text-emerald-900 ring-1 ring-emerald-500/20 dark:bg-emerald-900/60 dark:text-emerald-100 sm:inline-flex",
                activeRole === "patient" && "bg-sky-100/80 text-sky-900",
                activeRole === "doctor" && "bg-violet-100/80 text-violet-900",
                activeRole === "worker" && "bg-amber-100/80 text-amber-900"
              )}
            >
              {activeRole === "patient" && "Patient view"}
              {activeRole === "doctor" && "Doctor view"}
              {activeRole === "worker" && "ASHA Worker view"}
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="rounded-full border border-emerald-100/60 bg-white/40 shadow-sm hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-300" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}

