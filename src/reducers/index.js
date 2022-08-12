import { combineReducers } from "redux";
import todos from "./todo";
import auth from "./auth";
import posts from "./posts";

export default combineReducers({
  todos,
  auth,
  posts,
});
