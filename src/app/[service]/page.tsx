import { Typography, Box, Grid, Link, Breadcrumbs } from "@mui/material";
import { serviceAndMediaType } from "@/component/mappers/service&MediaType";
import FilterComponent, {
  FilterData,
} from "@/component/ServicePageComponents/FilterComponent";
import { getFilters } from "@/clients/getFilters";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Metadata } from "next/types";
import { fetchMedia } from "./actions";
import MediaList from "./mediaList";
import { Service } from "./types";
import { DefaultPage, DefaultPageSize } from "./constants";

interface ServicePageProps {
  params: { service: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

interface SearchParamType {
  cities: string | undefined;
  mediaTypes: string | undefined;
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
  const service = params.service as Service;
  const filters: FilterData = await getFilters(service);

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Home
    </Link>,
    <Typography key="3" color="text.primary">
      {serviceAndMediaType[service]}
    </Typography>,
  ];

  const { cities, mediaTypes } = searchParams as unknown as SearchParamType;

  const mediaDetails = await fetchMedia(
    service,
    DefaultPage,
    DefaultPageSize,
    cities,
    mediaTypes
  );

  return (
    <Box>
      <Breadcrumbs
        sx={{ margin: "8px 4px" }}
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      <FilterComponent params={params} initialFilters={filters} />
      {mediaDetails ? (
        <Box>
          <Grid container spacing={2}>
            <MediaList
              initialMediaDetails={mediaDetails}
              service={service}
              cities={cities}
              mediaTypes={mediaTypes}
            />
          </Grid>
        </Box>
      ) : (
        <Typography variant="body1">No details available</Typography>
      )}
    </Box>
  );
};

export default ServicePage;
