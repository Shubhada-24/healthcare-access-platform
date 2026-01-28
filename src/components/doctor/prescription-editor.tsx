"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X, Save, Pill } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const DEFAULT_RX = [
  "Tab Aspirin 150 mg – stat, then once daily.",
  "Tab Atorvastatin 80 mg – at night.",
  "Immediate referral to nearest cath‑lab enabled centre.",
];

export function PrescriptionEditor() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const shouldAutoOpen = searchParams.get("edit") === "prescription";

  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<string[]>(DEFAULT_RX);
  const [draft, setDraft] = useState(DEFAULT_RX.join("\n"));
  const [savedOnce, setSavedOnce] = useState(false);

  useEffect(() => {
    if (shouldAutoOpen) {
      setOpen(true);
      // remove ?edit=prescription from the URL after opening (demo nicety)
      const sp = new URLSearchParams(Array.from(searchParams.entries()));
      sp.delete("edit");
      const qs = sp.toString();
      router.replace(qs ? `${pathname}?${qs}#prescription` : `${pathname}#prescription`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldAutoOpen]);

  const rxText = useMemo(() => lines.join("\n"), [lines]);

  const onOpen = () => {
    setDraft(rxText);
    setOpen(true);
  };

  const onSave = () => {
    const next = draft
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    setLines(next.length ? next : DEFAULT_RX);
    setSavedOnce(true);
    setOpen(false);
  };

  return (
    <div id="prescription" className="scroll-mt-24 space-y-2">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        Prescription (demo only)
      </p>
      <div className="rounded-lg bg-white/80 p-2 text-xs ring-1 ring-emerald-100 dark:bg-slate-950/80 dark:ring-slate-800">
        {lines.map((l, i) => (
          <p key={i}>{l}</p>
        ))}
      </div>
      <Button size="sm" variant="secondary" className="mt-1 w-full" onClick={onOpen}>
        <Pill className="mr-1.5 h-3.5 w-3.5" />
        {savedOnce ? "Edit prescription" : "Add / edit prescription"}
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            aria-label="Close modal"
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-lg rounded-2xl border border-emerald-100 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-950">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                  Prescription editor
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Changes are only in-memory (no backend).
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className={cn(
                "min-h-[160px] w-full rounded-xl border border-emerald-200 bg-white/80 p-3 text-xs text-slate-900 shadow-sm outline-none ring-emerald-500/0 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-50"
              )}
              placeholder="Write each line on a new line..."
            />
            <div className="mt-3 flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={onSave}>
                <Save className="mr-1.5 h-3.5 w-3.5" />
                Save (local)
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

