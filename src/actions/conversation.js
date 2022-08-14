import * as api from "../api";
import { FETCH_ALL, CREATE } from "../constants/actionTypes";

export const getConversations = (id) => async (dispatch) => {
  try {
    const { data } = await api.getConversations(id);
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};
