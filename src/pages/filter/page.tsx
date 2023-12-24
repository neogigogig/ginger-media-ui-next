// Import necessary dependencies and components
import React from "react";
import { getFilterGmgData } from "@/app/getFilterGmgData/page";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Paper, Typography } from "@mui/material";
import Link from "next/link";
import { useTheme, useMediaQuery } from "@mui/material";
import FilterSearch from "@/app/FilterSearch/page";

const Filters: React.FC = (data: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLoadMore = () => {
    // Implement your load more logic here
  };

  return (
    <div>
      <FilterSearch />
      <div
        className="listing"
        style={{
          marginRight: "44px",
          marginLeft: isMobile ? "4.4rem" : "3rem",
        }}
      >
        {data &&
          Array.isArray(data) &&
          data.map((shelter, index) => (
            <Paper
              key={shelter.id}
              className="paper"
              style={{ width: isMobile ? "fit-content" : "270px" }}
            >
              <Link
                href={`/Details/${shelter.Id}`}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <div className="imageWrapper">
                  <img
                    src={shelter.Image}
                    className="imagePage"
                    alt={shelter.name}
                    style={{
                      width: "280px",
                      height: "150px",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <div className="media-name">
                  <Typography>
                    <strong>{shelter.Location}</strong>
                  </Typography>
                  <Typography>{shelter.MediaType}</Typography>
                </div>
                <div className="price-tag" style={{ marginLeft: "80px" }}>
                  <LocalOfferIcon className="price-icon" />
                  <span className="price">{shelter.Price}</span>
                </div>
                <div>
                  <Typography style={{ marginLeft: "19px" }}>
                    {shelter.AreaSqFt} sq.ft
                  </Typography>
                </div>
              </Link>
            </Paper>
          ))}
        {data.length > 0 && (
          <div className="buttonLoad">
            {/* Implement your load more button here */}
            <button onClick={handleLoadMore} className="button1">
              Load More...
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  try {
    const currentUrl = context.req.headers.host + context.req.url;

    const [, query] = currentUrl.split("?");

    const paramo = decodeURIComponent(query);
    const param = new URLSearchParams(paramo);

    const city = param.get("City");
    const mediaType = param.get("MediaType");

    const response = await getFilterGmgData({
      MediaType: mediaType || "",
      City: city || "",
    });

    const data = await response.json();

    return {
      props: { data },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { data: [] },
    };
  }
}

export default Filters;
