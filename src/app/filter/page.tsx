// Import necessary dependencies and components
'use client'

import React, { useEffect, useState } from 'react';
import { getFilterGmgData } from '../getFilterGmgData/page';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Paper, Typography, Box } from '@mui/material';
import Link from 'next/link';
import './style.css';
import { useTheme, useMediaQuery } from '@mui/material';
import FilterSearch from '../[FilterSearch]/page';

const FilterData: React.FC = (params) => {
  const [mediaType, setMediaType] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [busData, setBusData] = useState<any[]>([]); // Update the type if you know the structure
  const [displayedDataCount, setDisplayedDataCount] = useState<number>(12);
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  console.log(params.searchParams)
  console.log("filter")
  useEffect(() => {
    const fetchData = async () => {
      const currentUrl = window.location.href;
      console.log(currentUrl)
      
      const [, query] = currentUrl.split('?');
      console.log(query)
      const paramo = decodeURIComponent(query);
      const param = new URLSearchParams(paramo);
     
      console.log(param)
      const city = param.get('City');
      const mediaType = param.get('MediaType');
      console.log(mediaType)
      console.log(city);
      setMediaType(mediaType || '');
      setCity(city || '');

      try {
        setLoading(true);
        console.log('mediatype', mediaType);
        console.log('city', city);

        const response = await getFilterGmgData({
          MediaType: mediaType || '', // If mediaType is null, pass an empty string
          City: city || '',
        });

        const data = await response.json();
        console.log(data);
        setBusData(data);
        { console.log(busData) }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.searchParams,window.location.href]);

  const handleLoadMore = () => {
    if (Array.isArray(busData)) {
      const newDisplayedDataCount = displayedDataCount + 12;
      if (newDisplayedDataCount <= busData.length) {
        setDisplayedDataCount(newDisplayedDataCount);
      }
    }
  };

  return (
    <div>
       <FilterSearch/>
    <div className="listing" style={{ marginRight: '44px',marginLeft:isMobile?"4.4rem":"3rem" }}>
     
      {busData &&
        Array.isArray(busData) &&
        busData.slice(0, displayedDataCount).map((shelter, index) => (
          <Paper key={shelter.id} className="paper" style={{width:isMobile?"fit-content":"270px"}}>
            <Link
              href={`/Details/${shelter.Id}`}
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <div className="imageWrapper">
                <img
                  src={shelter.Image}
                  className="imagePage"
                  alt={shelter.name}
                  style={{
                    width: '280px',
                    height: '150px',
                    borderRadius: '10px',
                  }}
                />
              </div>
              <div className="media-name">
                <Typography>
                  <strong>{shelter.Location}</strong>
                </Typography>
                <Typography>{shelter.MediaType}</Typography>
              </div>
              <div className="price-tag" style={{ marginLeft: '80px' }}>
                <LocalOfferIcon className="price-icon" />
                <span className="price">{shelter.Price}</span>
              </div>
              <div>
                <Typography style={{ marginLeft: '19px' }}>
                  {shelter.AreaSqFt} sq.ft
                </Typography>
              </div>
            </Link>
          </Paper>
        ))}
      {loading && <div className="loading">Loading more data...</div>}
      {displayedDataCount < busData.length && !loading && (
        <div className="buttonLoad">
          <button onClick={handleLoadMore} disabled={loading} className="button1">
            Load More...
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default FilterData;
