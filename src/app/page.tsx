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
    <section>
        <FilterControl />
        <FilterData searchParams={searchParams}/>
    </section>
  );
};

export default Page;
