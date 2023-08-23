import Home from "../../views/Home/Home";
import { Routes, Route } from "react-router-dom";
import {
  HOME_PATH,
  LOG_IN_PATH,
  SIGN_UP_PATH,
  FORGOT_PASSWORD_PATH
} from "../../common/common";
import RegistrationForm from "../Sign-Up/SignUp";
import Login from "../Login/Login";
import ForgottenPassword from "../ForgottenPassword/ForgottenPassword";

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
        <Route path={SIGN_UP_PATH} element={<RegistrationForm />} />
        <Route path={LOG_IN_PATH} element={<Login />} />
        <Route path={FORGOT_PASSWORD_PATH} element={<ForgottenPassword />} />
      </Routes>
    </>
  );
};

export default RoutePaths;
