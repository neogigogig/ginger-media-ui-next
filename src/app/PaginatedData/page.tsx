// Import necessary dependencies and components
'use client'

import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from 'next/link'
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import "./Listing.css";
import { Box, CircularProgress } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material"
import { Button } from "@mui/material";

// Define the data item interface
interface DataItem {
  id: string;
  address: string;
}

// Main component definition
function PaginatedData() {
  const [page, setPage] = useState<number>(1);
  const [busData, setBusData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoadComplete, setInitialLoadComplete] =
    useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);

  const pageSize = 12;

  // Function to fetch data from the API
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
      if (jsonData.length === 0) {
        setHasMoreData(false);
      }

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

  // Function to handle "Load More" button click
  const handleLoadMore = () => {
    fetchData(page);
  };

  // Use MUI theme and media query for responsive styling
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '4rem',
    flexDirection: isMobile ? 'column' : 'row',
    marginLeft: isMobile ? '8px' : '0px',
  };

  // useEffect hook to fetch data on component mount
  useEffect(() => {
    // Only fetch data if initialLoadComplete is false
    if (!initialLoadComplete) {
      fetchData(page);
    }
  }, [initialLoadComplete]);

  // Render the component JSX
  return (
    <Box>
      <div className="listing" style={containerStyles}>
        {initialLoadComplete ? (
          busData.map((shelter: any) => (
            <Paper key={shelter.Image} className="paper">
              <Link
                href={`/details/${shelter.Id}`}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {/* ... (rest of your code) */}
              </Link>
            </Paper>
          ))
        ) : (
          <div className="loading">
            Loading <CircularProgress />
          </div>
        )}
      </div>
      {loading && initialLoadComplete && <div>Loading more data...</div>}
      {!loading && initialLoadComplete && hasMoreData && (
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
