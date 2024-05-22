// TempHome/page.tsx
import Link from "next/link";
import { Box } from "@mui/material";

const TempHome = () => {
  return (
    <Box sx={{ margin: "40px" }}>
      <Link
        href="/[service]"
        as="/outdoor"
        style={{
          backgroundColor: "#ff6702",
          color: "white",
          padding: "5px",
          textDecoration: "none",
        }}
      >
        Go to Outdoor Service Page
      </Link>
    </Box>
  );
};

export default TempHome;
