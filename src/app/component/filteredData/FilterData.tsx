import "./style.css";
import MediaCard from "../mediaCard/MediaCard";
import { getFilterGmgData } from "../../clients/getFilterGmgData";

interface FilterDataProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const FilterData = async ({ searchParams }: FilterDataProps) => {
  const { mediaType, city } = searchParams;
  if (Array.isArray(mediaType)) return; // TODO: figure out how to handle array.
  if (Array.isArray(city)) return;

  const response = await getFilterGmgData({
    MediaType: mediaType || "",
    City: city || "",
  });

  const data = await response.json();

  return (
    <div
      className="listing"
    >
      {
        Array.isArray(data) &&
        data.map((shelter) => (<>
          <MediaCard 
          image={shelter.Image} 
          title={shelter.Location} 
          description={shelter.Location}
          mediaType={shelter.MediaType}
          city={shelter.City}
          detailsUrl={`/details/${shelter.Id}`}
          price={shelter.Price}
          area={shelter.AreaSqFt}
          />
        </>))}
    </div>
  );
};

export default FilterData;
