import { TOUR_REDUCER_TYPE } from "../constants";

export const reducer = (state, action) => {
  switch (action.type) {
    case TOUR_REDUCER_TYPE.TITLE: {
      return {
        ...state,
        title: action.payload,
      };
    }
    case TOUR_REDUCER_TYPE.IMAGE_URL: {
      return {
        ...state,
        imageUrl: action.payload,
      };
    }
    case TOUR_REDUCER_TYPE.PRICE: {
      return {
        ...state,
        price: action.payload,
      };
    }
    case TOUR_REDUCER_TYPE.DATE: {
      return {
        ...state,
        date: action.payload,
      };
    }
    case TOUR_REDUCER_TYPE.DESCRIPTION: {
      return {
        ...state,
        description: action.payload,
      };
    }
    case TOUR_REDUCER_TYPE.RESET: {
      return {
        title: "",
        imageUrl: "",
        price: "",
        date: "",
        description: "",
      };
    }
    default: {
      return state;
    }
  }
};
