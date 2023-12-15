"use client"

import React, { useEffect, useState } from "react";
import { getSearchGmgData } from "../getSearchGmgData/page";
import { Paper, Container,Typography ,Box} from "@mui/material";
import Link from 'next/link'
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import "./Listing.css";
import FilterSearch from "../[FilterSearch]/page";
import { Button } from "@mui/material";
import { useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
const SearchData: React.FC  = (params) => {
  

  const [busData, setBusData] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayedDataCount, setDisplayedDataCount] = useState(0);
  

  // ..
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const containerStyles: React.CSSProperties = {
    marginBottom:'48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  // marginTop: '0rem',
  flexDirection: isMobile ? 'column' : 'row',
  marginRight:isMobile ? '88px' : '0px',
  width:'100%'
};
  const fetchData = async () => {
    try {
      setLoading(true);

      if (searchValue === null) {
        // Handle the case where searchValueFromUrl is null, e.g., provide a default value
        // or skip the API call
        console.error("Search value is null");
        return;
      }

      const response: any = await getSearchGmgData(searchValue);
      const data = await response.json();

      if (Array.isArray(data)) {
        setBusData(data);
      } else {
        console.error("API response is not an array:", data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  console.log(params)
console.log(params.params.search)

  useEffect(() => {
    
    const currentUrl = window.location.href;
     console.log(currentUrl)
      // Extract the data you need from the URL
      const [, query] = currentUrl.split('?search='); // Assuming the query parameters are after the "?" in the URL
      const param = new URLSearchParams(query);
      console.log(query)
      const city = param.get('search');
      console.log(city)
    // Set the initial search value from the URL
    setSearchValue(query || "bangalore");
  }, [params]);

  useEffect(() => {
    if (searchValue === "") {
      fetchData();
    } else {
      fetchData();
    }
  }, [searchValue]);

  useEffect(() => {
    if (busData.length > 0) {
      setDisplayedDataCount(Math.min(10, busData.length));
    }
  }, [busData]);

  const handleLoadMore = () => {
    const newDisplayedDataCount = displayedDataCount + 10;
    if (newDisplayedDataCount < busData.length) {
      setDisplayedDataCount(newDisplayedDataCount);
    } else {
      setDisplayedDataCount(busData.length);
    }
  };

  return (
    <div>
       <FilterSearch/>
    <div className="listing" style={{marginRight:'44px'}}>
     
      {busData && busData.slice(0, displayedDataCount).map((shelter: any) => (
        <Paper key={shelter.id} className="paper" style={{marginLeft:isMobile?"30px":""}}>
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
              <Typography>
                <strong>{shelter.Location}</strong>
              </Typography>
              <Typography>{shelter.MediaType}</Typography>
            </div>
            <div className="price-tag" style={{ marginLeft: "80px" }}>
              <LocalOfferIcon className="price-icon" />
              <span className="price">{shelter.Price}</span>
            </div>
            <div>
              <Typography style={{ marginLeft: "29px" }}>
                {shelter.AreaSqFt} sq.ft
              </Typography>
            </div>
          </Link>
        </Paper>
      ))}
      {loading && <div className="loading"></div>}
      {displayedDataCount < busData.length && !loading && (
        <div className="buttonLoad" >
          <button onClick={handleLoadMore} disabled={loading} className="button1">
            Load More...
          </button>
        </div>
      )}
    </div></div>
   
  );
};
export default SearchData