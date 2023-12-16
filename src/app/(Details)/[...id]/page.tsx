
'use client'
import React, { useEffect, useState } from "react";
import "./style.css";
import Box, { Stack } from "@mui/material";
import {
  Paper,
  Typography,
  Grid,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from 'next/image';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Link from 'next/link';

interface DetailsProps {
  params: {
    id: string;
  };
}

// eslint-disable-next-line @next/next/no-async-client-component
const Details: React.FC<DetailsProps> = async ({ params }) => {
  
  var shelterId = params.id;
  shelterId=shelterId[1];
  // const [data, setData] = useState<any>(null);

    const response = await fetch(
      `https://gjbq17jks3.execute-api.us-east-1.amazonaws.com/dev/getGmgById/${shelterId}`
    );
 
    const jsonData = await response.json();
    const data = jsonData[0];
      
  


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://gjbq17jks3.execute-api.us-east-1.amazonaws.com/dev/getGmgById/${shelterId}`
  //       );
  //       if (response.ok) {
  //         console.log("connected");
  //         const jsonData = await response.json();
  //         setData(jsonData[0]);
  //         console.log("Fetched data:", jsonData);
  //       } else {
  //         console.error("Failed to fetch data");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [shelterId]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // });

  // const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Container className="hoarding">
        {data && (
          <>
            <div>
              <h1 className="heading_main">
                Advertising on {data.MediaType} in {data.Location}
              </h1>
            </div>
            <Paper>
              <Paper
                style={{
                  marginTop:'2.2rem',
                  backgroundColor: "#ff6702",
                  display: "flex",
                  alignItems: "center",
                  padding: "13px 10px 10px",
                }}
                className="section1"
              >
                
                  <Image
                    src={data.Image}
                    width={1500}
                    height={380}
                    className="main_img"
                    alt="Bus with hoarding"
                    style={{ borderRadius: "10px" }}
                  />
               
                <div
                  style={{
                    textAlign: "center",
                    marginLeft: "82px",
                    display: "flex",
                    flexDirection: "row",
                    gap: "2rem",
                  }}
                >
                  <div style={{ marginRight: "5px" }} className="s2">
                    <div style={{ display: "flex", height: "65px" }}>
                      <div className="image_div">
                        <Image
                          className="img"
                          src={"/hoarding.png"}
                          alt="hoardings"
                          height={35}
                          width={35}
                        />
                      </div>
                      <div>
                        <p className="name1" style={{}}>
                          {data.MediaType}
                        </p>
                        <p className="name_media" style={{marginTop:'20px'}}>MEDIATYPE</p>
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div className="image_div">
                        <Image
                          className="img2"
                          src={"/light.png"}
                          alt="lighting"
                          height={35}
                          width={35}
                        />
                      </div>
                      <div>
                        <p className="name1" >data_Illumination</p>
                        <p className="name_light" style={{marginTop:'20px'}}>LIGHTING</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    color: "white",
                    paddingLeft: "35px",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      borderLeft: '1px solid lightgrey',
                      height: '150px',
                      margin: '0 10px',
                    }}
                  ></div>
                  <Typography className="paragrph_head">
                    <strong
                      style={{
                        marginLeft: "0px",
                        fontSize: '16px',
                        fontFamily: 'Noto Sans',
                      }}
                    >
                      {data.MediaType} Ads in {data.Location}
                    </strong>

                    <div
                      className="paragraph"
                      style={{
                        fontFamily: 'Noto Sans',
                        fontSize: '14px',
                      }}
                    >
                      {data.Description1}
                    </div>
                  </Typography>
                </div>
              </Paper>

              <Stack>
                <Stack
                  direction={{ xs: 'row', sm: 'column' }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                  sx={{ marginTop: "25px", marginLeft: "25px", display: "flex" }}
                >
                  <Typography variant="h4">Key Insight</Typography>
                </Stack>
                <Stack>
                  <ul className="orderkeyInsight">
                    <h2 className="styleline"></h2>
                    <li>
                      Landmark <h6>{data.Location.slice(0, 10)}....</h6>
                    </li>
                    <h2 className="styleline"></h2>
                    <li>
                      Id <h6>{data.Id.slice(-4)}</h6>
                    </li>
                    <h2 className="styleline2"></h2>
                    <li className="qli">
                      Quantity <h6>{1}</h6>
                    </li>
                  </ul>
                </Stack>
              </Stack>
            </Paper>

            <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{ marginTop: "45px" }}
            >
              <Grid item xs={12} sm={10} md={8} lg={6}>
                <Paper elevation={3} style={{ padding: 14 }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5403924821444!2d77.68999402484195!3d13.001221987316892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae110edafdb9ab%3A0x3b68346de02a8f79!2sDiesel%20Loco%20Shed%2C%20S.W%20Railway!5e0!3m2!1sen!2sin!4v1699968680601!5m2!1sen!2sin"
                    width="100%"
                    height={'450px'}
                    style={{ border: "0" }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </Paper>
              </Grid>
            </Grid>

            <Paper
              className="choice"
              elevation={3}
              style={{ width: '400px', height: 'auto' }}
            >
              <div className="Top_choice">
                <h3 style={{ marginLeft: '17px', marginRight: '17px', marginTop: '15px' }}>Top Choice</h3>
              </div>
              <div className="image" style={{ height: '150px', width: '250px', marginTop: '25px' }}>
                <img
                  src={data.Image}
                  className="main_img"
                  alt="Bus with hoarding"
                  style={{ width: "430px", height: "180px", borderRadius: "10px", marginLeft: '15px' }}
                />
              </div>
              <div style={{ marginLeft: '17px', marginRight: '17px', marginTop: '55px' }}>
                <h3>{data.MediaType}</h3>
              </div>
              <div style={{ marginLeft: '17px', marginRight: '17px' }}>
                {data.Description1}
              </div>
              <hr />
              <div className='buttons'>
                <div >TMA Offer </div>
                <div > &#8377; 1,0,0,000 Per Day</div>
              </div>
              <div className='button'  >
                <div className="button2"><RemoveRedEyeIcon /><p style={{ paddingLeft: '5px' }}>Eecution Details </p></div>
                <div className="button2"><ShoppingBasketIcon /><p style={{ paddingLeft: '5px' }}>Customize & Quote</p></div>
              </div>
            </Paper>

            <Grid container spacing={5} >
              <Grid item xs={12} sm={12} md={12}>
                <div className="description">
                <div className="d1">
                  <Typography    className="heading"  style={{ fontFamily: 'Noto Sans',fontSize:'30px',color:"#2D2E36" }}>
                    {data.Heading1}
                  </Typography>
                  <Typography  className="pf" style={{ fontFamily: 'Noto Sans' ,fontSize:'15px',color:'%626262',lineHeight:'2',marginTop:'8px'}}>
                    {data.Description1}
                  </Typography>
                </div>
                <div className="d1">
                  <Typography  variant="h5"  className="heading" style={{ fontFamily: 'Noto Sans',fontSize:'30px',color:"#2D2E36" }}>
                    {data.Heading2}
                  </Typography>
                  <Typography  className="pf" style={{ fontFamily: 'Noto Sans',fontSize:'15px' ,color:'%626262',lineHeight:'2',marginTop:'8px'}}>
                    {data.Description2}
                  </Typography>
                </div>
                <div className="d1">
                  <Typography variant='h5'   className="heading" style={{ fontFamily: 'Noto Sans',fontSize:'30px' ,color:"#2D2E36"}}>
                    {data.Heading3}
                  </Typography>
                  <Typography  className="pf" style={{ fontFamily: 'Noto Sans' ,fontSize:'15px',color:'%626262',lineHeight:'2',marginTop:'8px'}}>
                    {data.Description3}
                  </Typography>
                </div>
                <div className="d1">
                  <Typography variant="h5"   className="heading" style={{ fontFamily: 'Noto Sans',fontSize:'30px',color:"#2D2E36" }}>
                    {data.Heading4}
                  </Typography>
                  <Typography  className="pf" style={{ fontFamily: 'Noto Sans',fontSize:'15px' ,color:'%626262',lineHeight:'2',marginTop:'8px'}}>
                    {data.Description4}
                  </Typography>
                </div>
                <div className="d1">
                  <Typography    variant="h5"  className="heading" style={{ fontFamily: 'Noto Sans',fontSize:'30px',color:"#2D2E36" }}>
                    {data.Heading5}
                  </Typography>
                  <Typography  className="pf" style={{ fontFamily: 'Noto Sans',fontSize:'15px' ,color:'%626262',lineHeight:'2',marginTop:'8px'}}>
                    {data.Description5}
                  </Typography>
                </div>
                <div className="d1">
                  <Typography  variant="h5"  className="heading" style={{ fontFamily: 'Noto Sans',fontSize:'30px',color:"#2D2E36" }}>
                    {data.Heading6}
                  </Typography>
                  <Typography  className="pf" style={{ fontFamily: 'Noto Sans',fontSize:'15px',color:'%626262' ,lineHeight:'2',marginTop:'8px'}}>
                    {data.Description6}
                  </Typography>
                </div>
                <div className="d1">
                  <Typography variant="h5" className="heading" style={{ fontFamily: 'Noto Sans',fontSize:'30px',color:"#2D2E36" }}>
                    {data.Heading7}
                  </Typography>
                  <Typography  className="pf" style={{ fontFamily: 'Noto Sans',fontSize:'15px',color:'%626262',lineHeight:'2',marginTop:'8px' }}>
                    {data.Description7}
                  </Typography>
                </div>
                <div className="d1">
                  <Typography variant="h5"   className="heading" style={{ fontFamily: 'Noto Sans' ,fontSize:'30px',color:"#2D2E36"}}>
                    {data.Heading8}
                  </Typography>
                  <Typography  className="pf" style={{ fontFamily: 'Noto Sans' ,fontSize:'15px',color:'%626262',lineHeight:'2',marginTop:'8px'}}>
                    {data.Description8}
                  </Typography>
                </div>
                <div className="d1">
                  <Typography variant="h5"   className="heading" style={{ fontFamily: 'Noto Sans' ,fontSize:'30px',color:"#2D2E36"}}>
                    {data.Heading9}
                  </Typography>
                  <Typography  className="pf" style={{ fontFamily: 'Noto Sans',fontSize:'15px' ,color:'%626262',lineHeight:'2',marginTop:'8px'}}>
                    {data.Description9}
                  </Typography>
                </div>
                <div className="d1">
                  <Typography variant="h5" className="heading" style={{ fontFamily: 'Noto Sans',fontSize:'30px' ,color:"#2D2E36"}}>
                    {data.Heading10}
                  </Typography>
                  <Typography  className="pf" style={{ fontFamily: 'Noto Sans',fontSize:'15px',color:'%626262' ,lineHeight:'2',marginTop:'8px'}}>
                    {data.Description10}
                  </Typography>
                </div>
                </div>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </>
  );
};

export default Details;