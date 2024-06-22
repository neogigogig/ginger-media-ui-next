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
import {
  serviceAndMediaType,
  urlMapperServiceAndMediaType,
} from "@/component/mappers/service&MediaType";
import { MediaDetail, Service } from "./types";
import { fetchMedia } from "./actions";
import { DefaultPageSize } from "./constants";
import { cityMapper } from "@/component/mappers/cityMapper";

interface MediaListProps {
  service: Service;
  initialMediaDetails: MediaDetail[];
  cities: string | undefined;
  mediaTypes: string | undefined;
  lighting: string | undefined;
}

const formatStringToUrl = (input: string | undefined | null): string => {
  if (typeof input !== "string") {
    return "";
  }

  return input
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

const MediaList: React.FC<MediaListProps> = ({
  service,
  initialMediaDetails,
  cities,
  mediaTypes,
  lighting,
}) => {
  const [mediaDetails, setMediaDetails] = useState(initialMediaDetails);
  const [page, setPage] = useState(2);

  useEffect(() => {
    setMediaDetails(initialMediaDetails);
    setPage(2); // Reset to the second page for subsequent loads
  }, [initialMediaDetails]);

  async function loadMore() {
    const mediaList = await fetchMedia(
      service,
      page,
      DefaultPageSize,
      cities,
      mediaTypes,
      lighting
    );
    setMediaDetails((prevMediaDetails) => [...prevMediaDetails, ...mediaList]);
    setPage((prevPage) => prevPage + 1);
  }

  return (
    <>
      {mediaDetails.map((media) => (
        <Grid item xs={12} sm={6} md={4} key={media.id}>
          <Card>
            <CardMedia sx={{ height: 190 }} image={media.imageUrl} />
            <CardContent sx={{padding: "10px 10px 0 10px"}}>
              <Typography gutterBottom variant="h6" component="div">
                {serviceAndMediaType[media.mediaType] || media.mediaType}-
                {media.location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {cityMapper[media.city.toLowerCase()] || media.city}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={5}>
                  <Typography>
                    Price: {media.price}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <Typography>
                    Area(sq.ft): {media.areaInSqFeet} sq.ft
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Link
                href={`/${service}/${
                  urlMapperServiceAndMediaType[media.mediaType]
                }-${formatStringToUrl(media.area)}-${formatStringToUrl(
                  media.city
                )}/${media.id}`}
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
      <button
        onClick={loadMore}
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
    </>
  );
};

export default MediaList;
