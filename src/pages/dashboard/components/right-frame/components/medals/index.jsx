import Silver from "/img/medals/silver.svg";
import Gold from "/img/medals/gold.svg";
import Bronze from "/img/medals/bronz.svg";
import { MedalTypes, PlaceTypes } from "../../../../../types";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../../../../../common/utils/formatDate";
import { SlSizeFullscreen } from "react-icons/sl";

const Medals = ({ openMedals, setOpenMedals, dashboardDatas }) => {
  const { t } = useTranslation();


  console.log('coppp', dashboardDatas)

  return (
    <>
      <div className="w-[340px] group">
        <div
          onClick={() => setOpenMedals((prev) => !prev)}
          className="w-full bg-[#14151C] rounded border border-transparent transition-all duration-200 cursor-pointer parent:hover:border  hover:border hover:border-[#83D24F]">
          <h1 className="flex justify-between items-center font-rubik text-base font-bold rounded-t  p-2 bg-[#1c1d24]  text-[#517B38]">
            <p></p>
            {t(`Medals`)}
            <button className="rounded p-1 text-[#4B4C52] bg-[#292A31]">
              <SlSizeFullscreen size={20} />
            </button>
          </h1>

          {/* Object divided into 2 parts due to object structure. Belowing part belongs to medals counts */}
          <div className="px-2 py-2 gap-x-8">
            <div className="flex justify-between">
              {dashboardDatas?.medals &&
                Object.entries(
                  Object.keys(dashboardDatas?.medals)
                    .slice(0, 3)
                    .reduce((result, key) => {
                      result[key] = dashboardDatas?.medals[key];
                      return result;
                    }, {}),
                ).map(([key, value]) => (
                  <div className="flex justify-between gap-6">
                    <div className="flex flex-col items-center justify-center ">
                      <p
                        className={`text-${
                          key === MedalTypes.Gold ? "[#FCC417]" : key === MedalTypes.Silver ? "[#CECDD2]" : "[#F79429]"
                        } pb-1`}>
                        {t(key)}
                      </p>
                      <div className="flex justify-center items-center border border-[#2B2D33] rounded  bg-[#121319] mx-auto py-3 px-1">
                        <img
                          src={key === MedalTypes.Gold ? Gold : key === MedalTypes.Silver ? Silver : Bronze}
                          alt="medal"
                          className="w-8"
                        />
                        <span className="border border-[#2B2D33] rounded bg-[#121319] mx-auto  px-2">{value}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Other parts of object which consists of gold_place, bronze_place and etc. have been mapped at the below */}
            <div className=" h-36 group-hover:border-[#A2A8BC]  border border-[#2B2D33] rounded scrollbar scrollbar-custom overflow-y-scroll bg-[#121319] hover:bg-[#0B102F] mt-4 mx-auto">
              {dashboardDatas?.medals &&
                Object.entries(
                  Object.keys(dashboardDatas?.medals)
                    .slice(3, 6)
                    .reduce((result, key) => {
                      result[key] = dashboardDatas?.medals[key];
                      return result;
                    }, {}),
                ).map(([key, value]) => (
                  <div className="flex h-20">
                    <div
                      className={`w-2/6 border border-[#2B2D33] ${
                        key === PlaceTypes.GoldPlace
                          ? "text-[#FCC417]"
                          : key === PlaceTypes.SilverPlace
                          ? "text-[#CECDD2]"
                          : "text-[#F79429]"
                      }  flex items-center justify-center`}>
                      {key === PlaceTypes.GoldPlace
                        ? t("Gold")
                        : key === PlaceTypes.SilverPlace
                        ? t("Silver")
                        : t("Bronze")}
                    </div>
                    <div className="w-4/6 h-full pt-5 border border-[#2B2D33] overflow-y-scroll scrollbar scrollbar-custom text-[#88898C]  flex items-center flex-col justify-center ">
                      {value.length > 0 ? (
                        value?.map((item, idx) => {
                          const formattedDate = formatDate(item.fight_date);
                          return (
                            <div className="flex items-center  px-5 text-center w-full py-1 gap-4" key={idx}>
                              <p className="text-sm">{formattedDate}</p>
                              <p className="text-sm  truncate">{item?.location}</p>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-[#8F9093]  text-sm">
                          {t(
                            `No ${
                              key === PlaceTypes.GoldPlace
                                ? "gold"
                                : key === PlaceTypes.SilverPlace
                                ? "silver"
                                : "bronze"
                            } medals`,
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Medals;
