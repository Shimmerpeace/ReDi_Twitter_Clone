import type { Metadata } from "next";
import Header from "@/components/Header";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { LikesProvider } from "@/context/LikesContext";
import Sidebar from "../components/Sidebar";
import FollowBar from "../components/FollowBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChatMaDay",
  description: "A chat App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <main>
          <Header/>
            <div className="h-screen bg-[linear-gradient(90deg,_#020024_0%,_#090979_15%,_#00d4ff_100%)]">
              <div className="container h-full mx-auto xl:px-30 max-w-6xl">
                <div className="grid grid-cols-4 h-full">
                  <Sidebar />
                  <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
                    <LikesProvider>{children}</LikesProvider>
                  </div>
                  <FollowBar />
                </div>
              </div>
            </div>
          </main>
          
        </body>
      </html>
    </AuthProvider>
  );
}
