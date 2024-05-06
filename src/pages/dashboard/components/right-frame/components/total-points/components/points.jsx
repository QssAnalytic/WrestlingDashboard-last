import { useTranslation } from "react-i18next";
import { PointTypes } from "../../../../../../types";

export default function Points({ mainKey, points }) {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <div
        className={`bg-[#121319] rounded border ${
          mainKey === PointTypes.Skipped ? "border-[#ED2939]" : "border-[#4BB21A]"
        } flex justify-center items-center w-full`}>
        <div className="h-full w-full flex justify-center items-center flex-col ">
          <span
            className={`text-2xl ${
              mainKey === PointTypes.Skipped ? "text-[#ED2939]" : "text-[#4BB21A]"
            } border border-[#2B2D33] bg-[#21232A] rounded py-1 mt-2  px-[18px] flex justify-center items-center`}>
            {" "}
            {points?.avg_points}
          </span>
          <p className={`text-sm ${mainKey === PointTypes.Skipped ? "text-[#ED2939]" : "text-[#4BB21A]"} my-2`}>
            {t(`Avg ${mainKey} points`)}
          </p>
        </div>
        <div className="h-full w-full flex justify-center items-center flex-col">
          <span className="text-[#8F9093] border border-[#2B2D33] bg-[#21232A] rounded py-[5px] px-[10px] mt-2 flex justify-center items-center">
            {points?.total_points}
          </span>
          <p className="text-sm text-[#8F9093] my-2">{t(`Total ${mainKey} points`)}</p>
        </div>
      </div>
    </div>
  );
}
