import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./css/globals.css"; // certifique-se que o caminho está certo
import Providers from "./providers";
import ThemeToggle from "@/components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Notes App",
  description: "Notas simples com Next.js + MongoDB + Tailwind + Theme Toggle",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {/* Cabeçalho fixo */}
          <header className="border-b border-zinc-200 bg-[var(--color-background)] text-[var(--color-foreground)]">
            <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
              <h1 className="text-lg font-semibold">Next Notes</h1>
              <ThemeToggle />
            </div>
          </header>

          {/* Conteúdo principal */}
          <main className="mx-auto max-w-5xl p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
