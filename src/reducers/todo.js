import { FETCH_ALL, DELETE, UPDATE, CREATE } from "../constants/actionTypes";

const reducer = (todos = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload; //state always has to equal to something here it is an array

    case CREATE:
      console.log(action.payload);
      return [...todos, action.payload];

    case UPDATE:
      return todos.map((todo) =>
        todo._id === action.payload._id ? action.payload : todo
      );

    case DELETE:
      return todos.filter((todo) => todo._id !== action.payload);

    default:
      return todos;
  }
};

export default reducer;
