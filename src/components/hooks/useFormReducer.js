import { TOUR_REDUCER_TYPE } from "../../utils/constans";

export const useFormReducer = ({ dispatch }) => {
  const imageChangehandler = (event) => {
    dispatch({
      type: TOUR_REDUCER_TYPE.IMAGE_URL,
      payload: event.target.value,
    });
  };
  const priceChangehandler = (event) => {
    dispatch({ type: TOUR_REDUCER_TYPE.PRICE, payload: event.target.value });
  };
  const dateChangehandler = (event) => {
    dispatch({ type: TOUR_REDUCER_TYPE.DATE, payload: event.target.value });
  };
  const descriptionChangehandler = (event) => {
    dispatch({
      type: TOUR_REDUCER_TYPE.DESCRIPTION,
      payload: event.target.value,
    });
  };

  const titleChangehandler = (e) => {
    dispatch({ type: TOUR_REDUCER_TYPE.TITLE, payload: e.target.value });
  };

  return {
    titleChangehandler,
    imageChangehandler,
    priceChangehandler,
    dateChangehandler,
    descriptionChangehandler,
  };
};
