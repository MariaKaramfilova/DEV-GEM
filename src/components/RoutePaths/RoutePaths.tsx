import Home from "../../views/Home/Home";
import { Routes, Route } from "react-router-dom";
import {
  CREATE_ADDON_PATH,
  HOME_PATH,
  LOG_IN_PATH,
  SIGN_UP_PATH,
  FORGOT_PASSWORD_PATH,
  DETAILED_ADDON_VIEW_ID_PATH,
  SUCCESS_UPLOAD_PATH,
} from "../../common/common";
import RegistrationForm from "../Sign-Up/SignUp";
import Login from "../Login/Login";
import ForgottenPassword from "../ForgottenPassword/ForgottenPassword";
import DetailedAddonView from "../DetailedAddonView/DetailedAddonView";import CreateAddon from "../CreateAddon/CreateAddon.tsx";
import SuccessUploadAddon from "../../views/SuccessUploadAddon/SuccessUploadAddon.tsx";

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
        <Route path={DETAILED_ADDON_VIEW_ID_PATH} element={<DetailedAddonView />} />
        <Route path={CREATE_ADDON_PATH} element={<CreateAddon />} />
        <Route path={SUCCESS_UPLOAD_PATH} element={<SuccessUploadAddon />} />
      </Routes>
    </>
  );
};

export default RoutePaths;
