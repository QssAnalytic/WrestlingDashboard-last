import Points from "./components/points";
import { useTranslation } from "react-i18next";

export default function TotalPoints({totalPoints}) {
  const { t } = useTranslation();

  return (
    <section className="">
      <h1 className="flex justify-center items-center text-base font-bold rounded-t p-2 bg-[#1c1d24] text-[#517B38]">
        {t(`Total (gained & skipped) points`)}
      </h1>
      <div className="POINTS flex  mx-auto items-center justify-center gap-4 mt-5 px-5">
        {totalPoints && Object.entries(totalPoints).map(([key, value]) => <Points points={value?.[0]} mainKey={key} />)}
      </div>
    </section>
  );
}
