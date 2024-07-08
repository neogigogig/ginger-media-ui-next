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
import { cityMapper } from "@/component/mappers/cityMapper";

interface MediaListProps {
  service: Service;
  initialMediaDetails: MediaDetail[];
  nextOffset: number;
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
  nextOffset,
  cities,
  mediaTypes,
  lighting,
}) => {
  const [mediaDetails, setMediaDetails] = useState(initialMediaDetails);
  const [offset, setOffset] = useState(nextOffset);

  useEffect(() => {
    setMediaDetails(initialMediaDetails);
    setOffset(nextOffset); // Reset to the second page for subsequent loads
  }, [initialMediaDetails]);

  async function loadMore() {
    const response = await fetchMedia(
      service,
      offset,
      cities,
      mediaTypes,
      lighting
    );
    const mediaList = response?.mediaList;
    const nextOffset = response?.nextOffset;
    setMediaDetails((prevMediaDetails) => [...prevMediaDetails, ...mediaList]);
    setOffset(nextOffset);
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {mediaDetails.map((media) => (
        <Box
          key={media.gmgAssetCode}
          sx={{
            flex: "1 1 calc(33.333% - 16px)",
            margin: "8px",
            display: "flex",
            flexDirection: "column",
            marginTop: "24px",
          }}
        >
          <Card
            sx={{ display: "flex", flexDirection: "column", flex: "1 1 auto" }}
          >
            <CardMedia sx={{ height: 190 }} image={media.imageUrl} />
            <CardContent sx={{ flex: "1 1 auto", padding: "10px 10px 0 10px" }}>
              <Typography gutterBottom variant="h6" component="div">
                {serviceAndMediaType[media.medium] || media.medium} - {" "}
                {media.location}
              </Typography>
            </CardContent>
            <CardActions sx={{ flexDirection: "column", alignItems: "flex-start", padding: "0px 10px" }}>
              <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                {cityMapper[media.city.toLowerCase()] || media.city}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography>Price: {media.displayCostPerMonth}/month</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>
                    Area(sq.ft): {media.areaInSqFeet} sq.ft
                  </Typography>
                </Grid>
              </Grid>
              <Link
                href={`/${service}/${
                  urlMapperServiceAndMediaType[media.medium]
                }-${formatStringToUrl(media.area)}-${formatStringToUrl(
                  media.city
                )}/${media.gmgAssetCode}`}
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
        </Box>
      ))}
      {offset !== null && (
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
      )}
    </Box>
  );
};

export default MediaList;
