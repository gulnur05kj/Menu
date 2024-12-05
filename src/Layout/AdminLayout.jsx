import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const AdminLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
