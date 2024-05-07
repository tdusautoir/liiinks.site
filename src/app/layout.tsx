import type { Metadata } from "next";
import { Inter, Roboto, Prosto_One, Pacifico } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import SessionProvider from "@/providers/SessionProvider";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";

export const roboto = Roboto({
  weight: ["100", "400", "700"],
  style: 'normal',
  variable: "--font-roboto",
  subsets: ['latin'],
})

export const pacifico = Pacifico({
  weight: ["400"],
  style: 'normal',
  variable: "--font-pacifico",
  subsets: ['latin'],
})

export const inter = Inter({
  subsets: ['latin'],
  variable: "--font-sans",
  display: 'swap',
})

export const metadata: Metadata = {
  title: "@liiinks",
  description: "Tout sur vous en un seul clic. À travers un seul lien.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable, pacifico.variable, roboto.variable)}>
        <SessionProvider session={session}>
          {children}
          <Toaster />
          <Analytics />
        </SessionProvider>
      </body>
    </html>
  );
}
