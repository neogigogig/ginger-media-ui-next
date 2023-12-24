import { getFilterGmgData } from "../getFilterGmgData/page";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Paper, Typography, Box } from "@mui/material";
import Link from "next/link";
import "./style.css";

import FilterSearch from "../FilterSearch/page";

const FilterData: React.FC = async (params) => {
  
  var displaydatacount = 12;
   
  //  const currentUrl = window.location.href;
  //  const [, query] = currentUrl.split('?');
  //  const paramo = decodeURIComponent(query);
  //   const param = new URLSearchParams(paramo);
  //  const city = params.searchParams?params.searchParams.MediaType:"Hoardings";
  //   const mediaType = params.searchParams?params.searchParams.City:"Bangalore";

     const city="Bangalore";
     const mediaType="Hoardings"
  

  const response = await getFilterGmgData({
    MediaType: mediaType || "",
    City: city || "",
  });

  const data = await response.json();

  const handleLoadMore = () => {
    if (Array.isArray(data)) {
      const newDisplayedDataCount = displaydatacount + 12;
      if (newDisplayedDataCount <= data.length) {
        displaydatacount = newDisplayedDataCount;
      }
    }
  };

  return (
    <div>
      <FilterSearch />
      <div
        className="listing"
        style={{ marginRight: "44px", marginLeft: "3rem" }}
      >
        {displaydatacount &&
          Array.isArray(data) &&
          data.slice(0, displaydatacount).map((shelter, index) => (
            <div key={shelter.id} className="paper" style={{ width: "270px" }}>
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
            </div>
          ))}

        {displaydatacount < data.length && <div className="buttonLoad"></div>}
      </div>
    </div>
  );
};

export default FilterData;
