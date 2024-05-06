import LineBar from "../../../../../../components/frames/left_Frame/bars/line/LineBar";
import { BiLoaderAlt } from "react-icons/bi";
import { useTranslation } from "react-i18next";

const ScorecardMetrics = ({ data, isLoading }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#14151C] rounded">
      <h1 className="flex justify-center items-center  text-base font-bold rounded-t  bg-[#1c1d24] text-[#a87b41] p-2">
        {t(`Scorecard metrics`)}
      </h1>

      <div className="py-2 h-50">
        {data ? (
          data?.map((item, idx) => (
            <div className="flex-col text-sm py-[6px] px-5" key={idx}>
              <div className="flex justify-between items-center text-xs tracking-wide pb-2">
                <p>{t(item.metrics)}</p>
                <span className="text-sm">{Math.floor(item.score * 100)}</span>
              </div>
              <LineBar percent={item.score} />
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

export default ScorecardMetrics;
