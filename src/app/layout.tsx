import type { Metadata } from "next";
import "./globals.css";

import Footer from "./component/footer/Footer";
import Header from "./component/header/Header";
import { Container } from "@mui/material";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Container maxWidth="lg"> {children}</Container>
        <Footer />
      </body>
    </html>
  );
}
