import { SAVE_PLACES } from "../constants";

export const saveSelectedPlace = (payload) => {
  return {
    type: SAVE_PLACES,
    payload: payload,
  };
};
