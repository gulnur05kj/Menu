import { useReducer } from "react";
import styled from "styled-components";
import { TOUR_REDUCER_TYPE } from "../../utils/constants";
import { reducer } from "../../utils/generals/reducers";
import { axiosInstance } from "../../config/axiosInstance";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  imageUrl: "",
  price: "",
  date: "",
  description: "",
};

export const TourForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const titleChangeHandler = (e) => {
    dispatch({ type: TOUR_REDUCER_TYPE.TITLE, payload: e.target.value });
  };

  const imageChangeHandler = (e) => {
    dispatch({ type: TOUR_REDUCER_TYPE.IMAGE_URL, payload: e.target.value });
  };

  const priceChangeHandler = (e) => {
    dispatch({ type: TOUR_REDUCER_TYPE.PRICE, payload: e.target.value });
  };

  const dateChangeHandler = (e) => {
    dispatch({ type: TOUR_REDUCER_TYPE.DATE, payload: e.target.value });
  };

  const descriptionChangeHandler = (e) => {
    dispatch({ type: TOUR_REDUCER_TYPE.DESCRIPTION, payload: e.target.value });
  };

  const handleTourSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post("/menu", state);

      if (response.status) {
        toast.success("Меню успешно добавлен!!!");
        setTours((prev) => [...prev, { ...state, id: response.data.id }]);

        dispatch({ type: TOUR_REDUCER_TYPE.RESET });
      } else {
        throw new Error("redirect");
      }
    } catch (error) {
      toast.error(error.message || "Произошла ошибка");
    }
  };

  return (
    <FormStyles onSubmit={handleTourSubmit}>
      <StyledInput
        type="text"
        placeholder="Введите название "
        value={state.title}
        onChange={titleChangeHandler}
      />
      <StyledInput
        type="url"
        placeholder="Вставьте ссылку "
        value={state.imageUrl}
        onChange={imageChangeHandler}
      />
      <StyledInput
        type="number"
        placeholder="Введите стоимость"
        value={state.price}
        onChange={priceChangeHandler}
      />
      <StyledInput
        type="date"
        placeholder="Выберите дату"
        value={state.date}
        onChange={dateChangeHandler}
      />
      <StyledInput
        type="text"
        placeholder="Введите описание "
        value={state.description}
        onChange={descriptionChangeHandler}
      />
      <Button type="submit">Добавить</Button>
    </FormStyles>
  );
};

const FormStyles = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 350px;
  height: fit-content;
  padding: 20px;
  box-shadow: 0px 0px 17px 0px rgba(0, 0, 0, 0.5);
  margin: 100px auto;
  border-radius: 10px;
`;

const StyledInput = styled.input`
  height: 45px;
  border-radius: 6px;
  padding-left: 15px;
  padding-right: 10px;
  font-size: 16px;
  font-weight: 400;
  border: 1px solid gainsboro;
`;

const Button = styled.button`
  height: 45px;
  border-radius: 6px;
  border: none;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  background-color: #000;
  cursor: pointer;
`;
