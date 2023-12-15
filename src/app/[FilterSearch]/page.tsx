'use client'

import React, { useState, useEffect, MouseEvent } from "react";
import { Button, SvgIcon, Menu, MenuItem, Checkbox, Chip } from "@mui/material";
import Link from 'next/link';
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from 'next/navigation'
import { useTheme, useMediaQuery } from '@mui/material';
import { wrap } from "module";

const FilterSearch = () => {
  const router=useRouter();
  const [selectedDropdown, setSelectedDropdown] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string[] }>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [city, setCity] = useState<string[]>([]);
  
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchVal, setSearchVal] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  
  useEffect(() => {
    const currentUrl = window.location.href;
    const [, query] = currentUrl.split('?');
    const paramo = decodeURIComponent(query);
    const param = new URLSearchParams(paramo);

    const initialSelectedOptions: { [key: string]: string[] } = {};
    const initialCity: { [key: string]: string[] } = {};

    dropdowns.forEach((dropdown) => {
      const paramName = dropdown.name;
      const paramValue = param.get(paramName);

      if (paramValue) {
        const values = paramValue.split(',');
        initialSelectedOptions[paramName] = values;
        initialCity[paramName] = values;
      }
    });

    setSelectedOptions(initialSelectedOptions);
    setCity(initialCity);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setSearchVal(true);
  };

  const handleClick = () => {
    console.log(value);
    router.push(`./search?search=${value}`)
    // const updatedURL = `/search?search=${value}`;
    // navigate(updatedURL, { replace: true });
  };

  const handlefilter=()=>{
    console.log(city);
    router.push(`./filter/${city}`)
  }
  const dropdowns = [
    {
      name: "MediaType",
      options: ["Bus Shelter", "Hoardings", "Hoardings and unipoles"],
    },
    {
      name: "City",
      options: [
        "North Delhi",
        "East Delhi",
        "Noida",
        "NH1",
        "Bangalore",
        "Hyderabad",
        "Chennai",
        "Mumbai",
        "Delhi",
        "Vijayawada",
        "Baroda",
        "Kolkata",
      ],
    },
  ];

  const handleClose = () => {
    setSelectedDropdown("");
    setAnchorEl(null);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = {
        ...prevSelectedOptions,
        [selectedDropdown]: prevSelectedOptions[selectedDropdown]
          ? [...prevSelectedOptions[selectedDropdown], option]
          : [option],
      };
       
      const queryParams = Object.entries(updatedOptions)
        .map(([key, values]) => `${key}=${values.join(",")}`)
        .join("&");
      
      const link = `${queryParams ? `?${queryParams}` : ""}`;
      setCity(link);

      return updatedOptions; // Return the updated state
    });
  };

  const handleDeleteChip = (dropdown: string, option: string) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = {
        ...prevSelectedOptions,
        [dropdown]: prevSelectedOptions[dropdown]?.filter(
          (selectedOption) => selectedOption !== option
        ),
      };

      const queryParams = Object.entries(updatedOptions)
        .map(([key, values]) => `${key}=${values.join(",")}`)
        .join("&");

      const link = `${queryParams ? `?${queryParams}` : ""}`;
      setCity(link);

      return updatedOptions; // Return the updated state
    });
  };

  const handleCheckboxChange = (option: string) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = { ...prevSelectedOptions };

      if (updatedOptions[selectedDropdown]?.includes(option)) {
        updatedOptions[selectedDropdown] = updatedOptions[
          selectedDropdown
        ].filter((selectedOption) => selectedOption !== option);
      } else {
        updatedOptions[selectedDropdown] = [
          ...(updatedOptions[selectedDropdown] || []),
          option,
        ];
      }

      return updatedOptions;
    });
  };

  const handleOptionDeselect = (option: string) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = {
        ...prevSelectedOptions,
        [selectedDropdown]: prevSelectedOptions[selectedDropdown]?.filter(
          (selectedOption) => selectedOption !== option
        ),
      };

      const queryParams = Object.entries(updatedOptions)
        .map(([key, values]) => `${key}=${values.join(",")}`)
        .join("&");

      const link = `${queryParams ? `?${queryParams}` : ""}`;
      setCity(link);

      return updatedOptions;
    });
  };

  return (
   
    <div style={{  marginTop: '3rem', justifyContent: '',display:isMobile?"":"flex" }}>
      <div className="dropdown-filter" style={{ paddingLeft:isMobile?"3rem": '5rem' }}>
        {dropdowns.map((dropdown, index) => (
          <div key={index}>
            <Button
              variant="outlined"
              color="primary"
              onClick={(event: MouseEvent<HTMLButtonElement>) => {
                setSelectedDropdown(dropdown.name);
                setAnchorEl(event.currentTarget);
              }}
              endIcon={
                <SvgIcon>
                  <path d="M7 10l5 5 5-5z" />
                </SvgIcon>
              }
              sx={{ borderColor: "purple", borderRadius: 50 }}
            >
              {dropdown.name}
            </Button>
            <Menu
              className="custom-menu"
              keepMounted
              anchorEl={anchorEl}
              open={selectedDropdown === dropdown.name}
              onClose={handleClose}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div>
                {dropdown.options.map((option, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      if (selectedOptions[dropdown.name]?.includes(option)) {
                        handleOptionDeselect(option);
                      } else {
                        handleOptionSelect(option);
                      }
                    }}
                  >
                    <Checkbox
                      checked={
                        selectedOptions[dropdown.name]?.includes(option) || false
                      }
                    />
                    {option}
                  </MenuItem>
                ))}
              </div>
            </Menu>
          </div>
        ))}
       
          <div style={{ display: 'flex' }}>
            {/* <Link href={`/filter/${city}`}> */}
              <Button color="primary" variant="contained" onClick={handlefilter}>
                Apply Filter
              </Button>
            {/* </Link> */}
           
          
        </div>
        
      </div>

      {/* Display selected options as chips */}
     
      <div className="search-bar" style={{ marginLeft: "4.4rem", justifyContent: 'flex-end',marginBottom:isMobile?"1rem":"" }}>
              <input
                type="search"
                className="input"
                placeholder=" Search...."
                onChange={handleSearch}
                value={value}
                style={{ fontSize: 15 }}
              />

              <div className="hello">
                <SearchIcon className="search-icon" onClick={handleClick} />
              </div>
            </div>
            <div style={{ marginTop: '10px', display: 'flex' ,gap: '8px',flexWrap:'wrap',marginLeft:"4rem" }}>
        {Object.entries(selectedOptions).map(([dropdown, options]) => (
          options
            .filter((option) => option !== "")  // Exclude empty strings
            .map((option, index) => (
              <Chip
                key={index}
                label={option}
                onDelete={() => handleDeleteChip(dropdown, option)}
                color="primary"
              />
            ))
        ))}
      </div>
       
    </div>
  );
};

export default FilterSearch;
