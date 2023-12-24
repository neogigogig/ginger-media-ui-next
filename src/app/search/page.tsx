import { getSearchGmgData } from "../getSearchGmgData/page";
import { Paper, Container, Typography, Box } from "@mui/material";
import Link from "next/link";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import "./Listing.css";
import FilterSearch from "../FilterSearch/page";
import { Button } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
const SearchData: React.FC = async (params) => {
  console.log(params);
  // const [searchValue, setSearchValue] = useState("");
  // const [loading, setLoading] = useState(false);
  const displayedDataCount = 12;

  // ..

  // const currentUrl = window.location.href;
  // console.log(currentUrl)
  //  // Extract the data you need from the URL
  //  const [, query] = currentUrl.split('?search='); // Assuming the query parameters are after the "?" in the URL
  //  const param = new URLSearchParams(query);
  //  console.log(query)
  //  // const city = param.get('search');
  //  // console.log(city)
  // // Set the initial search value from the URL
  // setSearchValue(query || "bangalore");
  const searchValue = "Bangalore";

  const response: any = await getSearchGmgData(searchValue);
  const data = await response.json();

  // useEffect(() => {
  //   if (busData.length > 0) {
  //     setDisplayedDataCount(Math.min(10, busData.length));
  //   }
  // }, [busData]);

  // const handleLoadMore = () => {
  //   const newDisplayedDataCount = displayedDataCount + 10;
  //   if (newDisplayedDataCount < busData.length) {
  //     setDisplayedDataCount(newDisplayedDataCount);
  //   } else {
  //     setDisplayedDataCount(busData.length);
  //   }
  // };

  return (
    <div>
      <FilterSearch />
      <div
        className="listing"
        style={{ marginRight: "44px", marginLeft: "3rem" }}
      >
        {displayedDataCount &&
          Array.isArray(data) &&
          data.slice(0, displayedDataCount).map((shelter, index) => (
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

        {displayedDataCount < data.length && <div className="buttonLoad"></div>}
      </div>
    </div>
  );
};
export default SearchData;
