import { useTranslation } from "react-i18next";
import LineBar from "../../../../../../components/frames/left_Frame/bars/line/LineBar";
import { BiLoaderAlt } from "react-icons/bi";
import { RiStarSLine } from "react-icons/ri";

const SummaryStats = ({ data, isLoading }) => {
  const { t } = useTranslation();
  return (
    <div className=" bg-[#14151C] rounded bg">
      <h1 className="flex justify-center items-center font-rubik text-base font-bold rounded-t  bg-[#1c1d24] text-[#a87b41] p-2">
        {t(`Summary stats`)}
      </h1>
      <div className="py-2 h-64 overflow-y-scroll scrollbar scrollbar-summary-stats">
        {data ? (
          data?.map((metric, idx) => (
            <div className="flex-col text-sm font-rubik py-[6px] px-5" key={idx}>
              <div className="flex justify-between items-center text-xs tracking-wide pb-2">
                <p className="flex gap-1 items-center text-balance">
                  {metric.star ? <RiStarSLine color="text-white" /> : null}
                  {t(metric.metrics)}
                </p>
                <p className="text-sm">{metric.score}</p>
              </div>
              <LineBar
                percent={metric.bar_pct}
                successfulCount={metric?.succesful_count !== 0 ?metric?.successful_count : null}
                totalCount={metric?.total_count !== 0 ? metric?.total_count : null }
              />
            </div>
          ))
        ) : isLoading ? (
          <div className="flex justify-center h-full items-center text-xs tracking-wide pb-2">
            <BiLoaderAlt className="animate-spin text-[20px]" />
          </div>
        ) : (
          <p className="flex justify-center h-full items-center text-xs tracking-wide pb-2">No data</p>
        )}
      </div>
    </div>
  );
};

export default SummaryStats;
