import { createContext, useState } from "react";

export const FilterContext = createContext();

const FilterContextProvider = (props) => {
  // Dashboard filter state
  const [filterParams, setFilterParams] = useState({
    country: "aze",
    wrestler: 21493,
    years: [],
    action_name: "Takedown Score",
    metrics: "Takedown Score",
    stats: "Action escape rate",
    lang: "EN",
  });

  // Comparison Filter State
  const [comparisonFilter, setComparisonFilter] = useState({
    country_first: "",
    country_second: "",
  });

  const [openMedals, setOpenMedals] = useState(false);

  // Replace it with state only in select components, do not use such a kind of pattern
  const [filterDialog, setFilterDialog] = useState({
    country: false,
    wrestler: false,
  });

  return (
    <FilterContext.Provider
      value={{
        filterParams,
        setFilterParams,
        filterDialog,
        setFilterDialog,
        openMedals,
        setOpenMedals,
        comparisonFilter,
        setComparisonFilter,
      }}>
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;
