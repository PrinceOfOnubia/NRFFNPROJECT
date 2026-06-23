import type { Metadata } from "next";
import "./globals.css";
import "./revision.css";
import "./styles/associate.css";
import "./styles/ui-fixes.css";
import "./styles/landing.css";
import "./styles/portal.css";
import FloatingActions from "../components/FloatingActions";

export const metadata: Metadata = {
  title: "NRFFN | Real estate wealth network",
  description:
    "Nigerian Realtors Financial Freedom Network connects realtors, investors, estates, payments, documentation, and portfolio growth in one platform."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}<FloatingActions /></body>
    </html>
  );
}
