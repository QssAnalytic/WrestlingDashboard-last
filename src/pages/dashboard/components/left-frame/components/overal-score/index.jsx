import OveralCircle from "./components/overal-circle";
import { useTranslation } from "react-i18next";
 
const OveralScore = ({ data, currentWrestler }) => {
  const { t } = useTranslation();
  

  const percentage = data?.reduce((acc, next) => {
    return Math.floor(acc + (next?.score * 100) / data.length);
  }, 0);


  return (
    <div className=" bg-[#14151C] rounded">
      <h1 className="flex justify-center items-center text-base font-bold rounded-t bg-[#1c1d24] text-[#a87b41] p-2">
        {t(`Overall score`)}
      </h1>

      <div className="flex mx-auto justify-center items-center gap-7 p-5">
        <div className="">
          <h1 className="text-[#E5B352] font-rubik text-sm pt-1 w-24 text-balance">{currentWrestler}</h1>
        </div>
        <div className="w-32">
          <OveralCircle percentage={percentage} />
        </div>
      </div>
    </div>
  );
};

export default OveralScore;
