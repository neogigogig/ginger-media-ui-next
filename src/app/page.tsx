'use client'

import React, { useState } from 'react';
import FilterSearch from './[FilterSearch]/page'
import PaginatedData from './PaginatedData/page';

import FilterData from './filter/page';
const Page: React.FC = () => {
 

  return (
    <section>
         
         <FilterData/>
    </section>
  );
};

export default Page;
