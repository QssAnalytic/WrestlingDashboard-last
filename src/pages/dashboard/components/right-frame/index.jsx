import Medals from "../right-frame/components/medals";
import Decisions from "../right-frame/components/decisions";
import TotalPoints from "./components/total-points";
import Scores from "./components/scores";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import useSWR from "swr";
import { FilterContext } from "../../../../context/FilterContext";
import { DashboardContext } from "../../../../context/DashboardContext";
import useGetSummary from "./hooks/useGetSummary";
import { getData } from "../../../../services/api/requests";
import { rightFrameEndpoints } from "../../../../services/api/endpoints";

const RightFrame = () => {
  const { t } = useTranslation();
  const { dashboardDatas } = useContext(DashboardContext);
  const { openMedals, setOpenMedals, filterParams } = useContext(FilterContext);
  useGetSummary();

  // Data Fetchinh for components of right-frame

  // Datas for score components
  const { data: fights } = useSWR(
    filterParams?.wrestler && filterParams?.years?.length > 0
      ? rightFrameEndpoints.fights(filterParams.wrestler, filterParams.years)
      : null,
    getData,
  );
  // Datas for TotalPoints Components
  const { data: totalPoints } = useSWR(
    filterParams?.wrestler && filterParams?.years?.length > 0
      ? rightFrameEndpoints.points(filterParams?.wrestler, filterParams?.years)
      : null,
    getData,
  );

  // Datas for Decisons Component
  const { data: decisions } = useSWR(
    filterParams?.wrestler && filterParams?.years?.length > 0
      ? rightFrameEndpoints.decisions(filterParams.wrestler, filterParams.years)
      : null,
    getData,
  );

  return (
    <section className="text-center">
      <h1 className="font-customweight leading-5 tracking-wider  text-center text-[#83D24F] pt-2 pb-4">
        <a href="https://wrestling-dashboard-bt.vercel.app/">{t(`Career Summary`)}</a>
      </h1>

      <div className="border border-[#83D24F] h-[854px] rounded flex flex-col p-4 gap-3">
        <div className="flex gap-4">
          <Scores fights={fights} />
          <Medals openMedals={openMedals} setOpenMedals={setOpenMedals} dashboardDatas={dashboardDatas} />
        </div>

        <div className="bg-[#14151C] rounded mt-1 h-full">
          <TotalPoints totalPoints={totalPoints} />
          <Decisions decisions={decisions} />
        </div>
      </div>
    </section>
  );
};

export default RightFrame;
