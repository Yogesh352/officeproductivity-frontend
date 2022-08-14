import { combineReducers } from "redux";
import todos from "./todo";
import auth from "./auth";
import posts from "./posts";
import conversations from "./conversation";

export default combineReducers({
  todos,
  auth,
  posts,
  conversations,
});
