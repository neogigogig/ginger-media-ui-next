import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";

const Logo = () => {
  return (
      <Box> <Image alt="Logo" src={'/gmglogo.png'} width="200" height="500" /> </Box>
  );
};

export default Logo;
