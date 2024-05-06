import React from "react";
import LineChart from "../charts/LineChart";
import { useTranslation } from "react-i18next";

const OffenceStatsByYears = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#14151C] rounded ">
      <h1 className="flex justify-center items-center text-base font-bold rounded-t p-2 bg-[#1c1d24]  text-[#a87b41]">
        {t(`Offence stats by Years`)}
      </h1>
      <div className="flex justify-center items-center px-5 pt-8 pb-4">
        <LineChart />
      </div>
    </div>
  );
};

export default OffenceStatsByYears;
