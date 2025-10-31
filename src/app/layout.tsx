import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Activity Finder",
  description: "A web app for browsing and exploring community activities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
