import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { Suspense, useContext } from "react";
import { FaSpinner } from "react-icons/fa6";

function App() {
  return (
    <Suspense fallback={<FaSpinner className="animate-spin"/>}>
      <div className="m-auto container pt-4">
        <RouterProvider router={routes} />
      </div>
    </Suspense>
  );
}

export default App;
