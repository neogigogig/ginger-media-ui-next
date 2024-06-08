import type { Metadata } from "next";
import "./globals.css";

import Footer from "../component/footer/Footer";
import Header from "../component/header/Header";
import { Container } from "@mui/material";

export const metadata: Metadata = {
  title: "Ginger Media Group",
  description: "",
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
        <Container maxWidth="lg" sx={{minHeight: "500px"}}> {children}</Container>
        <Footer />
      </body>
    </html>
  );
}
