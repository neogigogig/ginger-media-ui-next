import React from "react";
import Link from "next/link";
import { Box, Container } from "@mui/material";
import Logo from "../logo/Logo";

const Header = () => {
  return (
    <Box sx={{ backgroundColor: "#F5F7FA", padding: "10px 0" }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Link href="https://www.gingermediagroup.com">
              <Logo />
            </Link>
          </Box>
          <Box>
            <Link
              href="https://gingermediagroup.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                backgroundColor: "#ff6702",
                color: "white",
                padding: "10px 20px",
                fontWeight: "600",
                borderRadius: "5px",
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Contact Us
            </Link>
            <Box />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
