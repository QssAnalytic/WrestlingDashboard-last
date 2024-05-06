import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Dashboard from "./pages/dashboard";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Dashboard />} />
    </Route>,
  ),
);

export { routes };
