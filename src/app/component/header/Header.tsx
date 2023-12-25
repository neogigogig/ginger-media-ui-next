import React from "react";
import Image from "next/image";

import Link from "next/link";
import { Box, Container } from "@mui/material";
import Logo from "../logo/Logo";

const Header = () => {
  return (
    <Box sx={{ backgroundColor: "#F5F7FA" }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Logo />
          </Box>
          <Box>
            <ul style={{ gap: "4rem", margin: "24px", display: "flex" }}>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/AboutUs">About Us</Link>
              </li>
            </ul>
            <Box />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
