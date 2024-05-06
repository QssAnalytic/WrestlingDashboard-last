import { useContext } from "react";
import Filter from "../../components/filter";
import Frames from "../../components/frames/Frames";
import { FilterContext } from "../../context/FilterContext";
import MedalModal from "./components/right-frame/components/medals/components/medal-modal";

export default function Dashboard() {
  const { openMedals, setOpenMedals } = useContext(FilterContext);

  return (
    <div className={`m-auto flex flex-col gap-3 justify-center items-center relative`}>
      <Filter />
      <Frames />
      {/* Medal modal for comprehensive info */}
      {openMedals ? <MedalModal open={openMedals} setOpen={setOpenMedals} /> : null}
    </div>
  );
}
