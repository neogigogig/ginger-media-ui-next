import "./style.css";
import MediaCard from "../mediaCard/MediaCard";
import { getFilterGmgData } from "../../clients/getFilterGmgData";

interface FilterDataProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const FilterData = async ({ searchParams }: FilterDataProps) => {
  const { mediaType, city,search } = searchParams;
  
  if (Array.isArray(mediaType)) return; // TODO: figure out how to handle array.
  if (Array.isArray(city)) return;
  if(Array.isArray(search)) return;

 
  const response = await getFilterGmgData({
    MediaType: mediaType || "",
    City: city || "",
  });
  
 
  const data = await response.json();
  return (
    <div
      className="listing" style={{marginTop:'20px'}}
    >
      {
        // Array.isArray(data) &&
        data.map((shelter:any) => (<>
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
