import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import FilterContextProvider from "./context/FilterContext.jsx";
import { SWRConfig } from "swr";
import "./i18";
import DashboardContextProvider from "./context/DashboardContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateIfStale: false,
        refreshInterval: 86400000,
        dedupingInterval: 86400000,
      }}>
        <DashboardContextProvider>
          <FilterContextProvider>
            <App />
          </FilterContextProvider>
        </DashboardContextProvider>
    </SWRConfig>
  </React.StrictMode>,
);
