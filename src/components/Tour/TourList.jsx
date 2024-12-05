import styled from "styled-components";
import { TourItem } from "./TourItem";
import { toast } from "react-toastify";
import { useState } from "react";

export const TourList = ({ menu = [] }) => {
  const [tours, setTours] = useState(menu);

  const handleDeleteTour = async (id) => {
    try {
      if (response.status === 200) {
        toast.success("Тур успешно удалён!");
        setTours((prev) => prev.filter((tour) => tour.id !== id));
      } else {
        throw new Error("Ошибка удаления тура");
      }
    } catch (error) {
      toast.error(error.message || "Произошла ошибка");
    }
  };

  return (
    <StyledUl>
      {menu?.map((item) => (
        <TourItem handleDeleteTour={handleDeleteTour} key={item.id} {...item} />
      ))}
    </StyledUl>
  );
};
export const StyledUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  margin-top: 50px;
  gap: 100px;
  flex-wrap: "wrap";
`;
