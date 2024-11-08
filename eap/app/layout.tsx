import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { UserProvider } from './context/UserContext';
import { LearningPathProvider } from './context/LearningPathContext';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "EAP Curriculum Builder",
  description: "A language learning app for aspiring university students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <UserProvider>
      <LearningPathProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
          </body>
        </html>
      </LearningPathProvider>
    </UserProvider>
    
  );
}
