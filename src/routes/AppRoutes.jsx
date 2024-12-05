import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import UserLayout from "../Layout/UserLayout";
import AdminLayout from "../Layout/AdminLayout";
import AdminRoutes from "./Admin/AdminRoutes";
import UserRoutes from "./User/UserRoutes";
import { PrivateRoute } from "./PrivateRouter";
import { PATHS } from "../utils/constants/paths";
import { SignUp } from "../components/auth/SignUp";
import { useSelector } from "react-redux";
import SignIn from "../components/auth/Signin";

export const AppRoutes = () => {
  const { userData } = useSelector((state) => state.menu);

  const pathByRole = {
    ADMIN: "/admin",
    USER: "/user",
    GUEST: "/",
  };

  const router = createBrowserRouter([
    {
      path: PATHS.HOME,
      element: <Navigate to={PATHS.SIGN_IN} />,
    },
    {
      path: PATHS.SIGN_UP,
      element: (
        <PrivateRoute
          Component={<SignUp />}
          isAuthorized={userData.role === "GUEST"}
          fallBackPath={pathByRole[userData.role]}
        />
      ),
    },
    {
      path: PATHS.SIGN_IN,
      element: (
        <PrivateRoute
          Component={<SignIn />}
          isAuthorized={userData.role === "GUEST"}
          fallBackPath={pathByRole[userData.role]}
        />
      ),
    },
    {
      path: PATHS.USER.ROOT,
      element: (
        <PrivateRoute
          Component={<UserLayout />}
          isAuthorized={userData.role === "USER"}
          fallBackPath={pathByRole[userData.role]}
        />
      ),
      children: UserRoutes(),
    },
    {
      path: PATHS.ADMIN.ROOT,
      element: (
        <PrivateRoute
          Component={<AdminLayout />}
          isAuthorized={userData.role === "ADMIN"}
          fallBackPath={pathByRole[userData.role]}
        />
      ),
      children: AdminRoutes(),
    },
    {
      path: PATHS.NOT_FOUND,
      element: <h1>404 Not Found</h1>,
    },
  ]);
  return <RouterProvider router={router} />;
};
