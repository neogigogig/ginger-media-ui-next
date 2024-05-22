import React from "react";
import "./style.css";
import IconButton from "@mui/material/IconButton";
import {LinkedIn,Instagram, Facebook, WhatsApp, Room, Phone, Email  } from "@mui/icons-material";


import Image from "next/image";
import { Box, Container } from "@mui/material";

const Footer = () => {
  return (
    <Box className="footer">
    <Container>
      <div className="container">
        <div className="left-section">
          <div className="left-img">
            <Image
              src={'/gmglogo.png'}
              alt="GMG Logo"
              width="200"
              height="130"
            />
            <p className="title">
              A Pragmatic and innovative way to enthrall your 
              target group is just a click away!
            </p>
          </div>
          <div className="social-icons">
            <IconButton>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                <LinkedIn style={{ color: "white", fontSize: 30 }} />
              </a>
            </IconButton>
            <IconButton>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <Facebook style={{ color: "white", fontSize: 30 }} />
              </a>
            </IconButton>
            <IconButton>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <Instagram style={{ color: "white", fontSize: 30 }} />
              </a>
            </IconButton>
            <IconButton>
              <a href="https://api.whatsapp.com/" target="_blank" rel="noopener noreferrer">
                <WhatsApp style={{ color: "white", fontSize: 30 }} />
              </a>
            </IconButton>
          </div>
        </div>
        <div className="middle-section">
          <span className="bold">Services</span>
          <div>
            <p>ATL Marketing Activities</p>
            <p>BTL Marketing</p>
            <p>Transit Advertising</p>
            <p>Residential Branding</p>
            <p>Fabrication and Mounting</p>
            <p>Digital Services</p>
          </div>
        </div>
        <div className="right-section">
          <span className="bold bold2">Get in Touch</span>
          <p className="icon"><Room style={{ color: "#ff6702" }} />{" "}
            Rukmini Knowledge Park, Kattigenahalli,
            {/* Add your address details */}
          </p>
          <p className="icon"> <Phone style={{ color: "#ff6702" }} />{" "}
            +91-9999999999
          </p>
          <p className="icon"><Email style={{ color: "#ff6702" }} />{" "}
            contact@gingermediagroup.com
          </p>
        </div>
      </div>

      <div className="lastline">
        <ul>
          <li>Blog</li>
          <li>About US</li>
          <li>Contact Us</li>
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
        </ul>
      </div>
      <div className="foot">
        <p>&copy; Ginger Media Group 2023. All Rights Reserved.</p>
      </div>
    </Container>
    </Box>
  );
};

export default Footer;
