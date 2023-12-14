'use client'
import FilterData from './FilterData/page'
import React, { useState } from 'react';
import FilterSearch from './FilterSearch/page'
import PaginatedData from './PaginatedData/page';


const Page: React.FC = () => {
 

  return (
    <section>
         <FilterSearch/>
      <FilterData/>
    </section>
  );
};

export default Page;
