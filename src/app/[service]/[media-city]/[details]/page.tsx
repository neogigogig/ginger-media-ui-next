import { Typography, Box, Paper, Stack, Grid } from "@mui/material";
import { getMediaDataById } from "@/clients/getMediaDataById";
import Image from "next/image";
import "./style.css";
import { description } from "@/component/detailsPage/detailsPageDescription";

interface DetailsPageProps {
  params: {
    service: string;
    details: string;
  };
}

const DetailsPage = async ({ params }: DetailsPageProps) => {
  const service = params.service;
  const mediaId = params.details;

  const mediaDetails = await (async () => {
    try {
      const response = await getMediaDataById(service, mediaId);
      return response;
    } catch (error) {
      console.error("Failed to fetch media details", error);
      return null;
    }
  })();

  return (
    <Box>
      {mediaDetails ? (
        <>
          <div>
            <h1 className="heading_main">
              Advertising on {mediaDetails.mediaType} in {mediaDetails.location}
            </h1>
          </div>
          <Paper>
            <Image
              src={mediaDetails.imageUrl}
              className="main_img"
              alt="Bus with hoarding"
              style={{ borderRadius: "10px" }}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={7}>
                <Typography>
                  {description[mediaDetails.mediaType]
                    ? description[mediaDetails.mediaType].replace(
                        "{{city}}",
                        mediaDetails.city
                      )
                    : "Description not available"}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography variant="h6">Key Insight</Typography>
                <Typography>Media Type: {mediaDetails.mediaType}</Typography>
                <Typography>City: {mediaDetails.city}</Typography>
                <Typography>
                  Location: {mediaDetails.location} near {mediaDetails.landmark}
                </Typography>
                <Typography>
                  Towards: {JSON.parse(mediaDetails.additionalDetails).towards}
                </Typography>
                <Typography>Media Id: {mediaId}</Typography>
                <Typography>Illumination: {mediaDetails.lighting}</Typography>
                <Typography>Area: {mediaDetails.areaInSqFeet} sq.ft</Typography>
              </Grid>
            </Grid>
          </Paper>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={10} md={8} lg={6}>
              <Paper elevation={3}>
                <iframe
                  src="https://maps.google.com/maps?q=13.0172352309,77.6600646891&z=15&output=embed"
                  width={200}
                  height={200}
                  style={{ border: "0" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Paper>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography variant="body1">No details available</Typography>
      )}
    </Box>
  );
};

export default DetailsPage;
