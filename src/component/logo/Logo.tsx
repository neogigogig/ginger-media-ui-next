import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";

const Logo = () => {
  return (
      <Box> <Image alt="Logo" src={'/gmglogo.png'} width="170" height="63" /> </Box>
  );
};

export default Logo;
