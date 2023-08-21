import Home from "../../views/Home/Home";
import { Routes, Route } from "react-router-dom";
import {
  HOME_PATH,
} from "../../common/common";

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
      </Routes>
    </>
  );
};

export default RoutePaths;
