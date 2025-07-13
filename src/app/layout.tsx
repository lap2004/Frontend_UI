"use client";

import { GoogleOAuthProvider } from '@react-oauth/google'; 
import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { EmotionProvider } from '../components/emotion/provider';
import { usePathname } from 'next/navigation';
import { useGetTrack } from '../services/hooks/hookAdmin';
import { useEffect } from 'react';

const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",  
});
<head>
  <script
    src="https://accounts.google.com/gsi/client"
    async
    defer
  ></script>
</head>
const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const pathname = usePathname();
  const { postUseTrack } = useGetTrack();

  useEffect(() => {
    if (pathname) {
      postUseTrack({ path: pathname }).catch((err) => {
        console.error("Tracking failed:", err);
      });
    }
  }, [pathname]);
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <EmotionProvider>{children}</EmotionProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
