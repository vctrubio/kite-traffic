import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kite Traffic",
  description: "100% control over your traffic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
      >
        {children}
      </body>
    </html>
  );
}
