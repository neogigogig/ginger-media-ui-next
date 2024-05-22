// app/[service]/page.tsx
import { getMediaDetailsByService } from "../../clients/getMediaDetailsByService";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  CardMedia,
  CardActions,
} from "@mui/material";
import { LocalOffer } from "@mui/icons-material";
import Link from "next/link";
import { camelCaseToNormalText } from "../../component/utils/camelCaseConverter";

const ServicePage = async ({ params }: { params: { service: string } }) => {
  const service = params.service;

  try {
    const response: any = await getMediaDetailsByService(service);
    const mediaDetails = response.data;
    if (!mediaDetails || mediaDetails.length === 0) {
      throw new Error("No media details found");
    }

    return (
      <Box>
        <Grid container spacing={2}>
          {mediaDetails.map((media: any) => (
            <Grid item xs={12} sm={6} md={4} key={media.id}>
              <Card sx={{ maxWidth: 325, minWidth: 325 }}>
                <CardMedia sx={{ height: 140 }} image={"#"} title={"#"} />
                <CardContent>
                  <Typography gutterBottom sx={{fontWeight: 500, fontSize: "18px"}} component="div">
                  {camelCaseToNormalText(media.mediaType)} - {media.landmark}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {media.mediaType} , {media.city}
                  </Typography>
                  <Box>
                    <LocalOffer />
                    <span>{media.price}</span>
                  </Box>
                  <Typography style={{ marginLeft: "19px" }}>
                    {media.areaInSqFeet} sq.ft
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link
                    href={`/${service}/${media.id}`}
                    style={{
                      backgroundColor: "blue",
                      color: "white",
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
      </Box>
    );
  } catch (error: any) {
    console.error("Error fetching media details:", error.message);
    return (
      <Box>
        <Typography variant="body1" color="error">
          Failed to load media details.
        </Typography>
      </Box>
    );
  }
};

export default ServicePage;
