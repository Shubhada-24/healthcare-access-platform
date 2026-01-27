import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Healthcare Access Platform",
  description: "Prototype for multi-role healthcare access and coordination",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-b from-emerald-50 via-sky-50 to-slate-50 text-slate-900 antialiased dark:from-slate-950 dark:via-slate-950 dark:to-slate-950">
        {children}
      </body>
    </html>
  );
}

