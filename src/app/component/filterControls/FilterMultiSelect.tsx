import React, { useCallback, useEffect } from "react";
import {
 Checkbox,
 FormControl,
 InputLabel,
 ListItemText,
 MenuItem,
 OutlinedInput,
 Select,
 SelectChangeEvent,
} from "@mui/material";
import { FilterParameter } from "./types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
 PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
 },
};

interface FilterMultiSelectProps {
 filterParameter: FilterParameter;
}

export default function FilterMultiSelect({
 filterParameter,
}: FilterMultiSelectProps) {
 const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);
 const router = useRouter();
 const pathname = usePathname();
 const searchParams = useSearchParams()!;

 useEffect(() => {
    const filtersFromUrl = searchParams.get(filterParameter.id);
    if (filtersFromUrl) {
      setSelectedFilters(filtersFromUrl.split(","));
    }
 }, [searchParams, filterParameter.id]);

 const handleChange = (event: SelectChangeEvent<typeof selectedFilters>) => {
    const {
      target: { value },
    } = event;
    setSelectedFilters(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    const valueString = typeof value === "string" ? value : value.join(",");
    const queryStr = createQueryString(filterParameter.id, valueString);
    router.push(pathname + '?' + queryStr)

 };

 const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
 );

 return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel>{filterParameter.label}</InputLabel>
      <Select
        multiple
        value={selectedFilters}
        onChange={handleChange}
        input={<OutlinedInput label={filterParameter.label} />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {filterParameter.options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            <Checkbox checked={selectedFilters.indexOf(option.id) > -1} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
 );
}