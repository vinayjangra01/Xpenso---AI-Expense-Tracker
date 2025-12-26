import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ClerkThemeProvider from "@/components/ClerkThemeProvider";
import Footer from "@/components/Footer";
import { checkUser } from "@/lib/checkUser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xpenso AI - Your Personal Finance Assistant",
  description: "AI-powered expense tracking and management app, built with Next.js and Clerk.",
  keywords: [
    "expense tracking",
    "personal finance",
    "budgeting",
    "finance management",
    "expense management",
    "expense tracking app",
    "personal finance app",
    "budgeting app",
    "finance management app",
    "expense management app",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <ClerkProvider>
      <ThemeProvider>
        <html lang="en" suppressHydrationWarning>
          <body>
            <ClerkThemeProvider>
              <Navbar />
              {children}
              <Footer />
            </ClerkThemeProvider>
          </body>
        </html>
      </ThemeProvider>
    </ClerkProvider>
  );
}
