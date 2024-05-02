import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import SessionProvider from "@/providers/SessionProvider";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "liiinks",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <SessionProvider session={session}>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
