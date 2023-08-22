import Home from "../../views/Home/Home";
import { Routes, Route } from "react-router-dom";
import {
  CREATE_ADDON_PATH,
  HOME_PATH,
} from "../../common/common";
import CreateAddon from "../CreateAddon/CreateAddon.tsx";

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
        <Route path={CREATE_ADDON_PATH} element={<CreateAddon />} />
      </Routes>
    </>
  );
};

export default RoutePaths;
