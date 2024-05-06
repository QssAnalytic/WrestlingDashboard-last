import { useContext, useEffect } from "react";
import useSWR from "swr";
import { FilterContext } from "../../../../../context/FilterContext";
import { rightFrameEndpoints } from "../../../../../services/api/endpoints";
import { getData } from "../../../../../services/api/requests";
import { DashboardContext } from "../../../../../context/DashboardContext";

export default function useGetSummary() {
  const { filterParams } = useContext(FilterContext);
  const { setDashboardDatas } = useContext(DashboardContext);
  const defaultCase = filterParams?.wrestler && filterParams?.years?.length > 0;

  const { data: medals } = useSWR(
    defaultCase ? rightFrameEndpoints.medals(filterParams?.wrestler, filterParams?.years) : null,
    getData,
  );


  useEffect(() => {
    setDashboardDatas({
      medals: medals,
    });
  }, [medals]);
}
