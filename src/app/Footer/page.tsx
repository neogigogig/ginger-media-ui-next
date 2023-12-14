import React from "react";
import "./style.css";
import IconButton from "@mui/material/IconButton";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import RoomIcon from "@mui/icons-material/Room";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="left-section">
          <div className="left-img">
            <Image
              src={'/gmglogo.png'}
              alt="GMG Logo"
              width={200}
              height={130}
              style={{ width: "100%", maxWidth: "350px" }}
            />
            <p className="title">
              A Pragmatic and innovative way to enthrall your 
              <div>target group is just a click away!</div>
            </p>
          </div>
          <div className="social-icons">
            <IconButton style={{ color: "white", border: '1px solid white', borderRadius: '50%', margin: "0 1.5rem 0 0" }}>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                <LinkedInIcon style={{ color: "white", fontSize: 30 }} />
              </a>
            </IconButton>
            <IconButton style={{ color: "white", border: '1px solid white', margin: "0 1.5rem 0 0" }}>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <FacebookIcon style={{ color: "white", fontSize: 30 }} />
              </a>
            </IconButton>
            <IconButton style={{ color: "white", border: '1px solid white', margin: "0 1.5rem 0 0" }}>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <InstagramIcon style={{ color: "white", fontSize: 30 }} />
              </a>
            </IconButton>
            <IconButton style={{ color: "white", border: '1px solid white', margin: "0 1.5rem 0 0" }}>
              <a href="https://api.whatsapp.com/" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon style={{ color: "white", fontSize: 30 }} />
              </a>
            </IconButton>
          </div>
        </div>
        <div className="middle-section">
          <span className="bold">Services</span>
          <div>
            <p className="p1">ATL Marketing Activities</p>
            <p className="p1">BTL Marketing</p>
            <p className="p1">Transit Advertising</p>
            <p className="p1">Residential Branding</p>
            <p className="p1">Fabrication and Mounting</p>
            <p className="p1">Digital Services</p>
          </div>
        </div>
        <div className="right-section">
          <span className="bold bold2">Get in Touch</span>
          <p className="icon"><RoomIcon style={{ color: "#ff6702" }} />{" "}
            Rukmini Knowledge Park, Kattigenahalli,
            {/* Add your address details */}
          </p>
          <p className="icon"> <PhoneIcon style={{ color: "#ff6702" }} />{" "}
            +91-9999999999
          </p>
          <p className="icon"><EmailIcon style={{ color: "#ff6702" }} />{" "}
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
    </div>
  );
};

export default Footer;
