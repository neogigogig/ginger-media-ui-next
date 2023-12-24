'use client'

import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import "./Listing.css";
import { Box,CircularProgress, Container } from "@mui/material";
import { useTheme,useMediaQuery } from "@mui/material"
import { Button } from "@mui/material";



// import Cart from "../Cart/Cart";
interface DataItem {
  id: string;
  address: string;
}


function PaginatedData() {
  const [page, setPage] = useState<number>(1);
  const [busData, setBusData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoadComplete, setInitialLoadComplete] =
    useState<boolean>(false);
    


  const pageSize = 12;

  const fetchData = async (currentPage: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://gjbq17jks3.execute-api.us-east-1.amazonaws.com/dev/getAllGmgByPaging?page=${currentPage}&pageSize=${pageSize}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const jsonData: DataItem[] = await response.json();
      if (currentPage === 1) {
        setBusData(jsonData);
        setInitialLoadComplete(true);
      } else {
        setBusData((prevData) => [...prevData, ...jsonData]);
      }
      setPage(currentPage + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

const addcart=(()=>{
     
})
  
       
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
const containerStyles: React.CSSProperties = {
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
marginTop: '4rem',
flexDirection: isMobile ? 'column' : 'row',
marginLeft:isMobile ? '8px' : '0px',
};
  useEffect(() => {
    fetchData(page);
  }, []);

  const handleLoadMore = () => {
    fetchData(page);
  };

  return (
    <Box>
      <div className="listing" style={containerStyles}>
        {initialLoadComplete ? (
          busData.map((shelter: any) => (
            <Paper key={shelter.Image} className="paper" >
              <Link
                href={`/details/${shelter.Id}`}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <div className="imageWrapper">
                  <img
                    src={shelter.Image}
                    className="imagePage"
                    alt={shelter.name}
                    style={{
                      width: "280px",
                      height: "150px",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <div className="media-name">
                  <Typography   className="paragraph1">
                    <strong >{shelter.Location}</strong>
                  </Typography>
                  <Typography>{shelter.MediaType}</Typography>
                </div>
                <div className="price-tag" style={{ marginLeft: "80px" }}>
                  <LocalOfferIcon className="price-icon" />
                  <span className="price">{shelter.Price}</span>
                </div>
                <div>
                  <Typography style={{ marginLeft: "99px" }}>
                    {shelter.AreaSqFt} sq.ft
                  </Typography>
                </div>
                
              </Link>
              {/* <Button variant="contained" style={{ marginTop: "auto" }} onClick={addcart}>
            ADD To Bag
          </Button> */}
            </Paper>
            
          
          ))
        ) : (
          <div className="loading">
            Loading <CircularProgress />
          </div>
        )}
      </div>
      {loading && initialLoadComplete && <div>Loading more data...</div>}
      {!loading && initialLoadComplete && (
        <div className="buttonLoad">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="button1"
          >
            Load More...
          </button>
        </div>
      )}
    </Box>
  );
}

export default PaginatedData;
