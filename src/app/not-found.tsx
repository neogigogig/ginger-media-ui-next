import Link from "next/link";
import { Box, Typography, Button, Container } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function NotFound() {
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        padding="50px"
      >
        <ErrorOutlineIcon
          color="error"
          style={{ fontSize: 100, marginBottom: "20px" }}
        />
        <Typography variant="h4" component="h4" gutterBottom>
          404 | Page Not Found
        </Typography>
        <Typography variant="h6" gutterBottom>
          Sorry, we could not find the page you were looking for.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="https://www.gingermediagroup.com"
          style={{
            display: "inline-block",
            backgroundColor: "#ff6702",
            color: "white",
            padding: "5px 10px",
            borderRadius: "8px",
            textDecoration: "none",
            textAlign: "center",
            marginTop: "20px",
            fontSize: "16px"
          }}
        >
          Go back home
        </Button>
      </Box>
    </Container>
  );
}
