import { AUTH, LOGOUT, FETCH_ALL } from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    case FETCH_ALL:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
