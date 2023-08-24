import Home from "../../views/Home/Home";
import { Routes, Route } from "react-router-dom";
import {
  HOME_PATH,
  FILTER_ADDONS_PATH
} from "../../common/common";
import FilterAddons from "../Filter-Addons/FilterAddons";

/**
 * Component defining the routing structure for the application.
 *
 * Defines the routing paths and corresponding components for different routes
 * within the application.
 *
 * @component
 * @returns {JSX.Element} Rendered component defining the application's routing.
 * @example
 * return (
 *   <RouteElement />
 * );
 */
const RoutePaths: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={HOME_PATH} element={<Home />} />
        <Route path={FILTER_ADDONS_PATH} element={<FilterAddons/>} />
      </Routes>
    </>
  );
};

export default RoutePaths;
