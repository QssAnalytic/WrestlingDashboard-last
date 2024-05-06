import { useState } from "react";
import LeftFrame from "../../pages/dashboard/components/left-frame";
import RightFrame from "../../pages/dashboard/components/right-frame/index";


const Frames = () => {

  return (
    <div className="text-white xl:flex gap-3">
      <LeftFrame />
      <RightFrame />
    </div>
  );
};

export default Frames;
