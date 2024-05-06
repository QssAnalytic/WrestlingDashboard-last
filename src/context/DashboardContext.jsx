import { createContext, useState } from "react";

export const DashboardContext = createContext();

const DashboardContextProvider = (props) => {
  const [dashboardDatas, setDashboardDatas] = useState({
    medals: undefined,
    fights: undefined,
    points: undefined,
    decisions: undefined,
  });

  const [comparisonDatas, setComparisonDatas] = useState({
    medalsFirst : undefined,
    medalsSecond : undefined
  });

  return (
    <DashboardContext.Provider value={{ dashboardDatas, setDashboardDatas, comparisonDatas, setComparisonDatas }}>
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
