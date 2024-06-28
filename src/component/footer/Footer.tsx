import React from "react";
import IconButton from "@mui/material/IconButton";
import {
  LinkedIn,
  Instagram,
  Facebook,
  WhatsApp,
  Room,
  Phone,
  Email,
  YouTube,
  Twitter,
} from "@mui/icons-material";
import Image from "next/image";
import { Box, Container, Typography, Link, Grid } from "@mui/material";

const hoverStyles = {
  color: "#d1d1d1",
  "&:hover": {
    color: "#ff6702",
    cursor: "pointer",
  },
};

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "black", color: "white" }}>
      <Container sx={{ padding: "48px 0px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box>
              <Link href="https://www.gingermediagroup.com">
                <Image
                  src={"/gmglogo.png"}
                  alt="GMG Logo"
                  width="240"
                  height="130"
                />
              </Link>
              <Typography sx={{ fontSize: 15, color: "#bababa", mt: 2 }}>
                A Pragmatic and innovative way to enthrall your target group is
                just a click away!
              </Typography>
            </Box>
            <Box
              sx={{
                width: 350,
                display: "flex",
                alignItems: "center",
                mt: 2,
              }}
            >
              <IconButton>
                <Link
                  href="https://www.facebook.com/gingermediagroup"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook sx={{ color: "white", fontSize: 26 }} />
                </Link>
              </IconButton>

              <IconButton>
                <Link
                  href="https://twitter.com/GMG_mediagroup"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter sx={{ color: "white", fontSize: 26 }} />
                </Link>
              </IconButton>

              <IconButton>
                <Link
                  href="https://www.youtube.com/channel/UC_aUYtSZk16uQ7NR66j9VuA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <YouTube sx={{ color: "white", fontSize: 26 }} />
                </Link>
              </IconButton>
              <IconButton>
                <Link
                  href="https://www.linkedin.com/company/gingermediagroup/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedIn sx={{ color: "white", fontSize: 26 }} />
                </Link>
              </IconButton>
              <IconButton>
                <Link
                  href="https://www.instagram.com/gingermediagroup/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram sx={{ color: "white", fontSize: 26 }} />
                </Link>
              </IconButton>
              <IconButton>
                <Link
                  href="https://wa.me/919902478800?text=Hi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsApp sx={{ color: "white", fontSize: 26 }} />
                </Link>
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                textAlign: "left",
                color: "white",
                transition: "color 0.3s",
                marginLeft: "30px",
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>Services</Typography>
              <Box sx={{ margin: "18px 0px" }}>
                <Typography
                  component="a"
                  href="https://www.gingermediagroup.com/atl-activities/"
                  sx={hoverStyles}
                >
                  ATL Activities
                </Typography>
              </Box>
              <Box sx={{ margin: "18px 0px" }}>
                <Typography
                  component="a"
                  href="https://www.gingermediagroup.com/btl-activities/"
                  sx={hoverStyles}
                >
                  BTL Activities
                </Typography>
              </Box>{" "}
              <Box sx={{ margin: "18px 0px" }}>
                <Typography
                  component="a"
                  href="https://www.gingermediagroup.com/transit-media/"
                  sx={hoverStyles}
                >
                  Transit Advertising
                </Typography>
              </Box>
              <Box sx={{ margin: "18px 0px" }}>
                <Typography
                  component="a"
                  href="https://www.gingermediagroup.com/residential-branding/"
                  sx={hoverStyles}
                >
                  Residential Branding
                </Typography>
              </Box>
              <Box sx={{ margin: "18px 0px" }}>
                <Typography
                  component="a"
                  href="https://www.gingermediagroup.com/fabrication-and-mounting/"
                  sx={hoverStyles}
                >
                  Fabrication and Mounting
                </Typography>
              </Box>
              <Box sx={{ margin: "18px 0px" }}>
                <Typography
                  component="a"
                  href="https://www.gingermediagroup.com/digital-services/"
                  sx={hoverStyles}
                >
                  Digital Services
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ flexShrink: 0, color: "white", mr: 4 }}>
              <Typography sx={{ mb: 2, fontSize: "18px", textAlign: "center" }}>
                Get in Touch
              </Typography>
              <Typography sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Room sx={{ color: "#ff6702", mr: 1 }} />
                Rukmini Knowledge Park, Kattigenahalli, SH 104, Srinivasa Nagar,
                Bengaluru, Karnataka 560064
              </Typography>
              <Typography sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Phone sx={{ color: "#ff6702", mr: 1 }} />
                +91-990 247 8800
              </Typography>
              <Typography sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Email sx={{ color: "#ff6702", mr: 1 }} />
                contact@gingermediagroup.com
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            textAlign: "center",
            pt: 5,
            color: "#bababa",
            margin: "22px 0px",
          }}
        >
          <Grid container justifyContent="center" spacing={2}>
            {[
              { label: "Blog", url: "https://www.gingermediagroup.com/blog/" },
              {
                label: "About Us",
                url: "https://www.gingermediagroup.com/about/",
              },
              {
                label: "Contact Us",
                url: "https://www.gingermediagroup.com/contact/",
              },
              {
                label: "Privacy Policy",
                url: "https://www.gingermediagroup.com/privacy-policy/",
              },
              {
                label: "Terms of Service",
                url: "https://www.gingermediagroup.com/terms-and-conditions/",
              },
            ].map((item, index) => (
              <Grid item key={index}>
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    margin: "0px 16px",
                    textDecoration: "none",
                    color: "white",
                    "&:hover": { color: "#ff6702" },
                  }}
                >
                  {item.label}
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ textAlign: "center", pt: 5, color: "#bababa" }}>
          <Typography sx={{fontSize: "15px"}}>
            &copy; Ginger Media Group 2023. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
