import { SAVE_PLACES } from "../constants";

export const Maps = (state = {}, action) => {
  switch (action.type) {
    case SAVE_PLACES: {
      return {
        lat: action.payload.lat,
        lang: action.payload.lang,
        address: action.payload.address,
      };
    }
    default:
      return state;
  }
};
