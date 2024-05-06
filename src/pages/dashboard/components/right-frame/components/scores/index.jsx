import { useLocation } from "react-router-dom";
import RightProgressBar from "./components/progress-bar";
import { useTranslation } from "react-i18next";

const Scores = ({ fights, wrestler }) => {
  const { t } = useTranslation();
  const path = useLocation();

  return (
    <div className="">
      <div className=" bg-[#14151C] rounded">
        <h1 className="flex justify-center items-center text-base font-bold rounded-t  p-2 bg-[#1c1d24]  text-[#517B38] text-balance">
          {t(`Scores`)}
        </h1>

        <div className=" h-full flex-col   pb-2 rounded ">
          {path.pathname === "/comparison" ? (
            <div className="wrestler text-[#83D24F] bg-[#292A30] border border-[#83D24F] rounded mx-3 mt-4 text-lg">
              {wrestler ? wrestler : 'No Wrestler'}
            </div>
          ) : null}

          <div className="flex justify-between items-center px-2 ">
            <div className="flex-col">
              <p className="text-[#8F9093] text-xs">{t(`Score by weight`)}</p>
              <span className="text-[#A96BCE] text-lg">{Math.ceil(fights?.score_by_weight * 100)}</span>
            </div>
            <div className=" ">
              <div className="text-[#8F9093] text-xs pt-1 px-2 ">
                <RightProgressBar
                  weight={fights?.score_by_weight * 100}
                  level={fights?.score_by_style * 100}
                  fights={fights}
                />
              </div>
            </div>
            <div className="flex-col ">
              <p className="text-[#8F9093]  text-xs">{t(`Score by level`)}</p>
              <span className="text-[#F79429] text-lg">{Math.ceil(fights?.score_by_style * 100)}</span>
            </div>
          </div>

          <div className="flex items-center  border border-[#2B2D33] rounded px-8 py-3 mx-3 bg-[#121319]  justify-between">
            <div className="flex-col basis-[30%]">
              <p className="text-[#8F9093] text-xs">{t(`Won`)}</p>
              <span className="text-[#4BB21A] text-lg">{fights?.win || 0} </span>
            </div>

            <div className="flex-col basis-[30%]">
              <p className="text-[#8F9093] text-xs">{t(`Number of fights`)}</p>
              <span className="font-bold ">{fights?.all_fights || 0}</span>
            </div>
            <div className="flex-col basis-[30%]">
              <p className="text-[#8F9093] text-center font-rubik text-xs">{t(`Lost`)}</p>
              <span className="text-[#ED2939] text-lg">{fights?.lose || 0} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scores;
