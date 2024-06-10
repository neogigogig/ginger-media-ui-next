import { Typography, Box, Paper, Grid, Link, Breadcrumbs } from "@mui/material";
import { getMediaDataById } from "@/clients/getMediaDataById";
import Image from "next/image";
import { description } from "@/component/detailsPage/detailsPageDescription";
import { serviceAndMediaType } from "@/component/mappers/service&MediaType";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

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

  if (!mediaDetails) {
    return (
      <Box>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link underline="hover" key="1" color="inherit" href="/">
            Home
          </Link>
          <Link underline="hover" key="2" color="inherit" href={`/${service}`}>
            {serviceAndMediaType[service]}
          </Link>
          <Typography key="3" color="text.primary">
            No details available
          </Typography>
        </Breadcrumbs>
        <Typography variant="body1">No details available</Typography>
      </Box>
    );
  }

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Home
    </Link>,
    <Link underline="hover" key="2" color="inherit" href={`/${service}`}>
      {serviceAndMediaType[service]}
    </Link>,
    <Typography key="3" color="text.primary">
      {serviceAndMediaType[mediaDetails.mediaType]} - {mediaDetails.location}
    </Typography>,
  ];

  return (
    <Box>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      {mediaDetails ? (
        <>
          <div>
            <Typography variant="h5">
              Advertising on {serviceAndMediaType[mediaDetails.mediaType]} in
              {mediaDetails.location}
            </Typography>
          </div>
          <Paper>
            <Image src={mediaDetails.imageUrl} alt={mediaDetails.mediaType} />
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
                  src={`https://maps.google.com/maps?q=${mediaDetails.latitude},${mediaDetails.longitude}&z=15&output=embed`}
                  width={200}
                  height={200}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
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
