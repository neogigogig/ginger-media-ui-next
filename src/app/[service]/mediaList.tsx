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

interface MediaListProps {
  service: Service;
  initialMediaDetails: MediaDetail[];
  cities: string | undefined;
  mediaTypes: string | undefined;
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
}) => {
  const [mediaDetails, setMediaDetails] = useState(initialMediaDetails);
  const [page, setPage] = useState(2);

  async function loadMore() {
    const mediaList = await fetchMedia(
      service,
      page,
      DefaultPageSize,
      cities,
      mediaTypes
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
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {serviceAndMediaType[media.mediaType] || media.mediaType}-
                {media.location}
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
