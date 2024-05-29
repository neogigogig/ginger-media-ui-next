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
import Link from "next/link";
import { serviceAndMediaType } from "@/component/mappers/service&MediaType";
import FilterComponent, {
  FilterData,
} from "@/component/ServicePageComponents/FilterComponent";
import { getFilters } from "@/clients/getFilters";
import { getMediaDetailsByServiceAndFilter } from "@/clients/getMediaDetailsByService&Filter";

interface ServicePageProps {
  params: { service: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ServicePage = async ({
  params,
  searchParams,
}: ServicePageProps) => {
  const service = params.service;
  const filters: FilterData = await getFilters(service);

  const isFiltersApplied = Object.keys(searchParams).length > 0;


  const mediaDetails = await (async () => {
    try {
      if (isFiltersApplied) {
        const response: any = await getMediaDetailsByServiceAndFilter(
          service,
          searchParams
        );
        const mediaList = response.data;
        if (!mediaList || mediaList.length === 0) {
          return null;
        } else {
          return response.data;
        }
      } else {
        const response: any = await getMediaDetailsByService(service);
        const mediaList = response.data;
        if (!mediaList || mediaList.length === 0) {
          return null;
        } else {
          return response.data;
        }
      }
    } catch (error) {
      console.error("Failed to fetch media details", error);
      return null;
    }
  })();

  return (
    <Box>
      <FilterComponent params={params} initialFilters={filters} />
      {mediaDetails ? (
        <Box>
          <Grid container spacing={2}>
            {mediaDetails.map((media: any) => (
              <Grid item xs={12} sm={6} md={4} key={media.id}>
                <Card>
                  <CardMedia image={"#"} title={"#"} />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {serviceAndMediaType[media.mediaType] || media.mediaType}{" "}
                      - {media.landmark}
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
                      href={`/${service}/${media.id}`}
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
        </Box>
      ) : (
        <Typography variant="body1">No details available</Typography>
      )}
    </Box>
  );
};

export default ServicePage;
