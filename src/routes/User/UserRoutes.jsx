import React from "react";
import { PATHS } from "../../utils/constants/paths";
import { Navigate } from "react-router-dom";
import TourCart from "../../pages/TourCart";

export const UserRoutes = () => {
  return [
    {
      path: PATHS.USER.ROOT,
      element: <Navigate to={PATHS.USER.USER_PRODUCT} />,
    },
    {
      path: PATHS.USER.USER_PRODUCT,
      element: <TourCart />,
    },
  ];
};

export default UserRoutes;
