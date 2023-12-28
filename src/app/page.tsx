import FilterData from "./component/filteredData/FilterData";
import FilterControl from "./component/filterControls/FilterControls";

const Page = ({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) => {

  return (
    <section style={{alignItems:'center'}} className="lg:mx-auto mx-auto pl-5">
   
        <FilterControl />
       
        <FilterData searchParams={searchParams}/>
    </section>
  );
};

export default Page;
