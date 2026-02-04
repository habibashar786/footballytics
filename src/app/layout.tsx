import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Footballytics | Elite Football Intelligence",
  description: "State-of-the-art multi-stakeholder football intelligence platform with AI-powered analytics",
  keywords: ["football", "analytics", "soccer", "statistics", "transfers", "valuations"],
  authors: [{ name: "Footballytics" }],
  openGraph: {
    title: "Footballytics | Elite Football Intelligence",
    description: "AI-powered football analytics platform",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar />
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
            {/* Header */}
            <Header />
            
            {/* Page Content */}
            <main className="flex-1 overflow-auto p-6 bg-gradient-to-br from-black via-gray-900/50 to-black">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
