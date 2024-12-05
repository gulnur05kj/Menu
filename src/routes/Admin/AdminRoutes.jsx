import React from "react";
import { PATHS } from "../../utils/constants/paths";
import { Navigate } from "react-router-dom";
import MainPage from "../../pages/MainPage";

export const AdminRoutes = () => {
  return [
    {
      path: PATHS.ADMIN.ROOT,
      element: <Navigate to={PATHS.ADMIN.ADMIN_PRODUCT} />,
    },
    {
      path: PATHS.ADMIN.ADMIN_PRODUCT,
      element: <MainPage />,
    },
  ];
};

export default AdminRoutes;
