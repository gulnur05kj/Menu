import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductThunk } from "../../redux/thunks/productThunk";
import styled from "styled-components";
import { StyledButton, StyledDescription, StyledLi } from "./TourItem";
import { StyledUl } from "./TourList";
import { Button } from "@mui/material";

export const User = () => {
  const { tours } = useSelector((state) => state.tours);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductThunk());
  }, [dispatch]);

  return (
    <div>
      <h1>Пользовательская страница</h1>
      {tours.length > 0 ? (
        <StyledUl>
          {tours.map((tour) => (
            <StyledLi key={tour.id}>
              <img src={tour.imageUrl} alt="" />
              <h3 style={{ color: "black" }}>{tour.title}</h3>
              <p style={{ color: "black" }}> {tour.price}</p>
              <span style={{ marginLeft: "10px", color: "black" }}>
                {tour.date}
              </span>

              <StyledDescription>{tour.description}</StyledDescription>
              <Button variant="contained">показать</Button>
            </StyledLi>
          ))}
        </StyledUl>
      ) : (
        <StyledButton> добавлен</StyledButton>
      )}
    </div>
  );
};
