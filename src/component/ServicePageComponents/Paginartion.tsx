"use client";

import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardActions,
  CardContent,
  Link,
  CardMedia,
} from "@mui/material";
import { getMediaDetailsByServiceAndFilter } from "@/clients/getMediaDetailsByService&Filter";
import { serviceAndMediaType } from "../mappers/service&MediaType";

interface ParamsDisplayComponentProps {
  params: { [key: string]: any };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ParamsDisplayComponent: React.FC<ParamsDisplayComponentProps> = ({
  params,
  searchParams,
}) => {
  const [page, setPage] = useState(2);
  const service = params.service;
  const [mediaDetails, setMediaDetails] = useState<any[]>([]);

  useEffect(() => {
    setPage(2);
    setMediaDetails([]);
  }, [params, searchParams]);

  const handleLoadMore = async () => {
    try {
      const response: any = await getMediaDetailsByServiceAndFilter(
        service,
        searchParams,
        page
      );
      const mediaList = response.data;
      setMediaDetails((prevMediaDetails) => [
        ...prevMediaDetails,
        ...mediaList,
      ]);
      setPage((prevPage) => prevPage + 1);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box>
      {mediaDetails ? (
        <Box>
          <Grid container spacing={2}>
            {mediaDetails.map((media: any) => (
              <Grid item xs={12} sm={6} md={4} key={media.id}>
                <Card>
                  <CardMedia image={media.imageUrl} />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {serviceAndMediaType[media.mediaType] || media.mediaType}-{" "}
                      {media.landmark}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {media.city}
                    </Typography>
                    <Box>
                      <span>{media.price}</span>
                    </Box>
                    <Typography style={{ marginLeft: "19px" }}>
                      {media.areaInSqFeet} sq.ft
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link
                      href={`/${service}/${media.mediaType}-${media.city}/${media.id}`}
                      style={{
                        color: "blue",
                        padding: "5px 5px",
                        textDecoration: "none",
                      }}
                    >
                      Learn More
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <button
            onClick={handleLoadMore}
            style={{
              color: "white",
              backgroundColor: "#ff6702",
              padding: "10px",
              margin: "12px",
              fontWeight: "600",
              borderRadius: "5px",
            }}
          >
            Load More ...
          </button>
        </Box>
      ) : (
        <button
          onClick={handleLoadMore}
          style={{
            color: "white",
            backgroundColor: "#ff6702",
            padding: "10px",
            margin: "12px",
            fontWeight: "600",
            borderRadius: "5px",
          }}
        >
          Load More ...
        </button>
      )}
    </Box>
  );
};

export default ParamsDisplayComponent;
