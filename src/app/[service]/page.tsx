import { getMediaDetailsByService } from "../../clients/getMediaDetailsByService";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  CardMedia,
  CardActions,
  Link,
  Breadcrumbs,
} from "@mui/material";
import { serviceAndMediaType, urlMapperServiceAndMediaType } from "@/component/mappers/service&MediaType";
import FilterComponent, {
  FilterData,
} from "@/component/ServicePageComponents/FilterComponent";
import { getFilters } from "@/clients/getFilters";
import { getMediaDetailsByServiceAndFilter } from "@/clients/getMediaDetailsByService&Filter";
import ParamsDisplayComponent from "@/component/ServicePageComponents/Paginartion";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Metadata } from "next/types";

interface ServicePageProps {
  params: { service: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> { 
  const service = params.service;
  const title = serviceAndMediaType[service];

  return {
    title: `${title} Advertising | Ginger Media Group`,
    description: "",
  };
}

const ServicePage = async ({ params, searchParams }: ServicePageProps) => {
  const service = params.service;
  const filters: FilterData = await getFilters(service);

  const formatStringToUrl = (input: string): string => {
    return input.toLowerCase().replace(/\s+/g, '-');
  };

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Home
    </Link>,
    <Typography key="3" color="text.primary">
      {serviceAndMediaType[service]}
    </Typography>,
  ];

  const isFiltersApplied = Object.keys(searchParams).length > 0;

  const mediaDetails = await (async () => {
    try {
      if (isFiltersApplied) {
        const response: any = await getMediaDetailsByServiceAndFilter(
          service,
          searchParams,
        );
        const mediaList = response.data;
        if (!mediaList || mediaList.length === 0) {
          return null;
        } else {
          return response.data;
        }
      } else {
        const response: any = await getMediaDetailsByService(service, 18);
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
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      <FilterComponent params={params} initialFilters={filters} />
      {mediaDetails ? (
        <Box>
          <Grid container spacing={2}>
            {mediaDetails.map((media: any) => (
              <Grid item xs={12} sm={6} md={4} key={media.id}>
                <Card>
                  <CardMedia image={media.imageUrl} />
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
                      href={`/${service}/${urlMapperServiceAndMediaType[media.mediaType]}-${formatStringToUrl(media.location)}-${formatStringToUrl(media.city)}/${media.id}`}
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
          <Box sx={{marginTop: "15px"}}>
            <ParamsDisplayComponent
              params={params}
              searchParams={searchParams}
            />
          </Box>
        </Box>
      ) : (
        <Typography variant="body1">No details available</Typography>
      )}
    </Box>
  );
};

export default ServicePage;
