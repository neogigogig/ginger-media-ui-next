import {
  Typography,
  Box,
  Paper,
  Grid,
  Link,
  Breadcrumbs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { getMediaDataById } from "@/clients/getMediaDataById";
import { description } from "@/component/detailsPage/detailsPageDescription";
import { serviceAndMediaType } from "@/component/mappers/service&MediaType";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { filterOptions } from "@/component/mappers/filter";
import { Metadata } from "next/types";

interface DetailsPageProps {
  params: {
    service: string;
    "media-city": string;
    details: string;
  };
}

function formatMediaCity(mediaCity: string): string {
  return mediaCity
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: DetailsPageProps): Promise<Metadata> {
  const { "media-city": mediaCity } = params;
  const formattedTitle = formatMediaCity(mediaCity);

  return {
    title: `${formattedTitle} Advertising | Ginger Media Group`,
    description: "",
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
    <Typography
      key="3"
      color="text.primary"
      sx={{ textDecoration: "underline" }}
    >
      {serviceAndMediaType[mediaDetails.medium]} - {mediaDetails.area}
    </Typography>,
  ];

  return (
    <Box>
      <Breadcrumbs
        sx={{ margin: "8px 4px" }}
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      {mediaDetails ? (
        <Paper elevation={0}>
          <Typography variant="h5" sx={{ padding: "12px" }}>
            Advertising on {serviceAndMediaType[mediaDetails.medium]} in{" "}
            {mediaDetails.area} - {mediaId}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <img
                src={mediaDetails.imageUrl}
                alt={mediaDetails.medium}
                style={{
                  maxWidth: "400px",
                  maxHeight: "400px",
                  width: "100%",
                  height: "100%",
                  padding: "10px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography sx={{ padding: "8px", textAlign: "justify" }}>
                {description[mediaDetails.medium]
                  ? description[mediaDetails.medium].replace(
                      "{{city}}",
                      `${mediaDetails.area}, ${mediaDetails.city}`
                    )
                  : "Description not available"}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7}>
              <Typography
                sx={{ fontSize: "22px", fontWeight: "600", padding: "8px" }}
              >
                Key Insights
              </Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Media Type</TableCell>
                      <TableCell>
                        {serviceAndMediaType[mediaDetails.medium]}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>City</TableCell>
                      <TableCell>{mediaDetails.city}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Area</TableCell>
                      <TableCell>{mediaDetails.area}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Location</TableCell>
                      <TableCell>{mediaDetails.location}</TableCell>
                    </TableRow>
                    {mediaDetails.landmark && (
                      <TableRow>
                        <TableCell>Landmark</TableCell>
                        <TableCell>{mediaDetails.landmark}</TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell>Media Id</TableCell>
                      <TableCell>{mediaDetails.gmgAssetCode}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Illumination</TableCell>
                      <TableCell>
                        {filterOptions["lighting"][mediaDetails.type]}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Price</TableCell>
                      <TableCell>
                        ₹ {mediaDetails.displayCostPerMonth} per month
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Area(sq.ft)</TableCell>
                      <TableCell>{mediaDetails.areaInSqFeet} sq.ft</TableCell>
                    </TableRow>
                    {JSON.parse(mediaDetails.additionalDetails).period && (
                      <TableRow>
                        <TableCell>Period</TableCell>
                        <TableCell>
                          {JSON.parse(mediaDetails.additionalDetails).period}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Box sx={{ padding: "32px" }}>
                <iframe
                  src={`https://maps.google.com/maps?q=${mediaDetails.latitude},${mediaDetails.longitude}&z=15&output=embed`}
                  style={{
                    maxHeight: "500px",
                    minHeight: "300px",
                    width: "100%",
                    height: "100%",
                  }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Typography variant="body1">No details available</Typography>
      )}
    </Box>
  );
};

export default DetailsPage;
