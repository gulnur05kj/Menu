import React from "react";
import { useRucerApi } from "../components/hooks/useRucerApi";
import { TourForm } from "../components/Tour/TourForm";
import { TourList } from "../components/Tour/TourList";

export const MainPage = () => {
  const [menu] = useRucerApi();

  return (
    <div>
      <TourForm />
      <TourList menu={menu} />
    </div>
  );
};

export default MainPage;
