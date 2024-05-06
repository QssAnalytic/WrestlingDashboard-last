import { useTranslation } from "react-i18next";
import LineChart from "../../common/line-chart";

const OffenceStatsByYears = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#14151C] rounded ">
      <h1 className="flex justify-center items-center text-base font-bold rounded-t p-2 bg-[#1c1d24]  text-[#a87b41]">
        {t(`Offence stats by Years`)}
      </h1>
      <div className="flex justify-center items-center px-5 pt-8 pb-4">
        {data ? (
          <LineChart
            data={data.data}
            max={data?.end_interval}
            medium={data?.end_interval / 2}
            start={0}
          />
        ) : (
          <p className="flex justify-center items-center h-full">No data</p>
        )}
      </div>
    </div>
  );
};

export default OffenceStatsByYears;
