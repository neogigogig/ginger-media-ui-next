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
            <Link href="/"><Logo /></Link>
          </Box>
          <Box>
            <ul style={{ gap: "4rem", margin: "24px", display: "flex" }}>
             
            </ul>
            <Box />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
