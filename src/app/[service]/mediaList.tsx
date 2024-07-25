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

  function formatPrice(num: number): string {
    const numStr = num.toString().replace(/,/g, "");
    const lastThreeDigits = numStr.slice(-3);
    const otherDigits = numStr.slice(0, -3);

    const formattedOtherDigits = otherDigits.replace(
      /\B(?=(\d{2})+(?!\d))/g,
      ","
    );
    const formattedNumber =
      otherDigits.length > 0
        ? `${formattedOtherDigits},${lastThreeDigits}`
        : lastThreeDigits;

    return formattedNumber;
  }

  return (
    <Box sx={{ flexGrow: 1, marginLeft: "16px" }}>
      <Grid container spacing={2}>
        {mediaDetails.map((media) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={media.gmgAssetCode}
            sx={{ marginTop: "12px"}}
          >
            <Card
              sx={{ display: "flex", flexDirection: "column", height: "100%", flex: "1 1 auto" }}
            >
              <CardMedia
                component="img"
                sx={{ height: 190 }}
                image={media.imageUrl}
                alt={`${serviceAndMediaType[media.medium] || media.medium} - ${
                  media.location
                }`}
              />
              <CardContent sx={{ flexGrow: 1, padding: "10px 10px 0 10px" }}>
                <Typography gutterBottom variant="h6" component="h6">
                  {serviceAndMediaType[media.medium] || media.medium} -{" "}
                  {media.location}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0px 10px",
                }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                  {cityMapper[media.city.toLowerCase()] || media.city}
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      Price: {formatPrice(media.displayCostPerMonth)}/month
                    </Typography>
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
                  )}/${media.gmgAssetCode.toLowerCase()}`}
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
