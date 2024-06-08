"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FormControl,
  Checkbox,
  Box,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  ListItemText,
} from "@mui/material";
import { filterCategory, filterOptions } from "../mappers/filter";

export interface FilterData {
  cities: string[];
  mediaTypes: string[];
  lighting: string[];
}

export type FilterCategory = keyof FilterData;

interface FilterComponentProps {
  params: {
    service: string;
  };
  initialFilters: FilterData;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  params,
  initialFilters,
}) => {
  const service = params.service;
  const [filters] = useState<FilterData>(initialFilters);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key in FilterCategory]?: string[];
  }>({});
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (category: FilterCategory, value: string) => {
    setSelectedFilters((prev) => {
      const newSelectedFilters = { ...prev };
      if (!newSelectedFilters[category]) {
        newSelectedFilters[category] = [];
      }
      if (newSelectedFilters[category]!.includes(value)) {
        newSelectedFilters[category] = newSelectedFilters[category]!.filter(
          (v) => v !== value
        );
      } else {
        newSelectedFilters[category]!.push(value);
      }
      return newSelectedFilters;
    });
  };

  const updateURL = () => {
    const filteredSelectedFilters = Object.keys(selectedFilters).reduce(
      (acc, key) => {
        const value = selectedFilters[key as FilterCategory];
        if (value && value.length > 0) {
          acc[key as FilterCategory] = value;
        }
        return acc;
      },
      {} as { [key in FilterCategory]?: string[] }
    );

    const query = new URLSearchParams();
    (Object.keys(filteredSelectedFilters) as FilterCategory[]).forEach(
      (category) => {
        if (filteredSelectedFilters[category]) {
          query.set(category, filteredSelectedFilters[category]!.join(","));
        }
      }
    );

    router.push(`/${service}?${query.toString()}`);
  };

  useEffect(() => {
    updateURL();
  }, [selectedFilters]);

  useEffect(() => {
    const query = new URLSearchParams(searchParams.toString());
    const updatedSelectedFilters: { [key in FilterCategory]?: string[] } = {};
    query.forEach((value, key) => {
      const category = key as FilterCategory;
      const values = value.split(",");
      updatedSelectedFilters[category] = values;
    });
    setSelectedFilters(updatedSelectedFilters);
  }, [searchParams]);

  const handleSelectChange = (event: any, category: FilterCategory) => {
    const value = event.target.value as string[];
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  return (
    <Box>
      {(Object.keys(filters) as FilterCategory[]).map((category) => (
        <FormControl key={category} sx={{ m: 1, width: 300 }} size="small">
          <InputLabel id={`${category}-label`}>
            {filterCategory[category]}
          </InputLabel>
          <Select
            labelId={`${category}-label`}
            id={`${category}-select`}
            multiple
            value={selectedFilters[category] || []}
            onChange={(event) => handleSelectChange(event, category)}
            input={<OutlinedInput label={category} />}
            renderValue={(selected) =>
              selected.map((value) => filterOptions[category][value]).join(", ")
            }
          >
            {filters[category].map((value) => (
              <MenuItem
                key={value}
                value={value}
                onClick={() => handleFilterChange(category, value)}
              >
                <Checkbox
                  size="small"
                  checked={selectedFilters[category]?.includes(value) || false}
                />
                <ListItemText primary={filterOptions[category][value]} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </Box>
  );
};

export default FilterComponent;