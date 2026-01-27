import * as React from "react";
import { cn } from "@/lib/utils";

const severityColors: Record<
  "low" | "medium" | "high" | "default",
  string
> = {
  low: "bg-emerald-50 text-emerald-800 ring-emerald-500/20 dark:bg-emerald-950 dark:text-emerald-100",
  medium:
    "bg-amber-50 text-amber-800 ring-amber-500/20 dark:bg-amber-950 dark:text-amber-100",
  high: "bg-red-50 text-red-800 ring-red-500/20 dark:bg-red-950 dark:text-red-100",
  default:
    "bg-slate-100 text-slate-800 ring-slate-500/20 dark:bg-slate-900 dark:text-slate-100",
};

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  severity?: "low" | "medium" | "high" | "default";
}

export function Badge({
  className,
  severity = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        severityColors[severity],
        className
      )}
      {...props}
    />
  );
}

