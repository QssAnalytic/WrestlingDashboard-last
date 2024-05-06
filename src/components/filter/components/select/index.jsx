import React, { useState, useRef, useEffect } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { useTranslation } from "react-i18next";

export default function Select({ id, name, data, value, setValue, filterDialog, setFilterDialog }) {
  const dropdownRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterDialog?.[id] && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFilterDialog((prev) => ({ ...prev, [id]: false }));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterDialog?.[id]]);

  const handleToggle = (id) => {
    setFilterDialog((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelect = (value) => {
    handleToggle(id);
    // handling 2nd get request when wrestler change
    if (id === "action_name" || id === "metrics" || id === "stats") {
      // This type of specifying must be. Because of using select component for wrestler, country and stats
      setValue((prev) => ({ ...prev, [id]: value }));
    } else if (id === "country") {
      setValue((prev) => ({ ...prev, [id]: value, wrestler: [], years: [] }));
    } else {
      setValue((prev) => ({ ...prev, [id]: value, years: [] }));
    }
  };

  const filteredData = data?.filter((item) => item.data?.toLowerCase().includes(searchTerm.toLowerCase()));
  console.log(filteredData);

  return (
    <div className="flex flex-col text-[#AAADB6] justify-between gap-1 w-full">
      <p className="text-[#AAADB6] weight hover:bg-[#374677] transition-all duration-150 leading-5 tracking-wider">
        {name !== "Offence stats" ? t(name) : ""}
      </p>
      <div className="relative text-center cursor-pointer hover:text-white" ref={dropdownRef}>
        <ul
          className="rounded py-[12px] px-4 border border-[rgb(55,58,69)] bg-[#0F1322] w-full z-[99]"
          id={id}
          onClick={(e) => handleToggle(e.currentTarget.id)}>
          <li className="flex text-[#AAADB6] w-full h-full hover:text-white items-center justify-center gap-3">
            <p className="truncate">
              {!value?.[id]
                ? `${name}`
                : id !== "country" && id !== "action_name" && id !== "metrics" && id !== "stats"
                ? filteredData?.map((item) => (item.id === value?.[id] ? t(item.data) : ""))
                : id !== "action_name" && id !== "metrics" && id !== "stats"
                ? t(value?.[id]).toUpperCase()
                : t(value?.[id])}
            </p>
            <div className={`w-4 transform ${filterDialog?.[id] ? "rotate-360" : ""}`}>
              <TiArrowSortedDown size={20} />
            </div>
          </li>
        </ul>
        {filterDialog?.[id] ? (
          <div className="dropdown-options z-[99]  absolute top-12 right-0 w-full">
            <ul className="z-10 rounded border border-[#373A45]  bg-[#0F1322] my-1 overflow-y-auto h-56 text-sm">
              <li className="w-full flex items-center justify-center bg text-center">
                <input
                  type="text"
                  placeholder={t(`Search ${name}`)}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="capitalize border border-transparent w-full bg-transparent text-center text-[#AAADB6] focus:outline-none px-2 py-2 rounded "
                />
              </li>
              {filteredData?.map((item, i) => (
                <li
                  key={item}
                  id={id}
                  className=" cursor-pointer hover:bg-[#374677] hover:text-white p-2 transition-all duration-100"
                  onClick={() =>
                    handleSelect(
                      id !== "country" && id !== "action_name" && id !== "metrics" && id !== "stats"
                        ? item.id
                        : item.data,
                    )
                  }>
                  {console.log("item", item)}
                  {t(id === "country" ? item.data.toUpperCase() : item.data)}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
