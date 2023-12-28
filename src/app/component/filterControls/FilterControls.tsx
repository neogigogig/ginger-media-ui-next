'use client'

import React from "react";
import FilterMultiSelect from "./FilterMultiSelect";
import { FilterParameter } from "./types";

const filterParameters: FilterParameter[] = [
    {
        id: 'mediaType',
        label: 'Media Type',
        options: [{
            id: 'busShelter',
            label: 'Bus Shelter',
        },{
            id: 'hoardings',
            label: 'Hoardings',
        },{
            id: 'hoardingsAndUnipoles',
            label: 'Hoardings and unipoles',
        }],
    },
    {
        id: 'city',
        label: 'City',
        options: [{
            id: 'northDelhi',
            label: 'North Delhi',
        },{
            id: 'eastDelhi',
            label: 'East Delhi',
        },{
            id: 'noida',
            label: 'Noida',
        },{
            id: 'NH1',
            label: 'NH1',
        },{
            id: 'bangalore',
            label: 'Bangalore',
        },{
            id: 'hyderabad',
            label: 'Hyderabad',
        },{
            id: 'chennai',
            label: 'Chennai',
        },{
            id: 'mumbai',
            label: 'Mumbai',
        },{
            id: 'delhi',
            label: 'Delhi',
        },{
            id: 'vijayawada',
            label: 'Vijayawada',
        },{
            id: 'baroda',
            label: 'Baroda',
        },{
            id: 'kolkata',
            label: 'Kolkata',
        }],
    }
];

const FilterControls = () => {
    return (
        <div style={{marginTop:'20px'}} className="lg:mx-auto mx-auto pl-{10}">
            {filterParameters.map(parameter => <FilterMultiSelect key={parameter.id} filterParameter={parameter}/>)}
            {}
        </div>
    )
}

export default FilterControls;