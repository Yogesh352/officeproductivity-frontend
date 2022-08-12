import { FETCH_ALL, DELETE, UPDATE, CREATE, LIKE } from "../constants/actionTypes";

const reducer = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload; //state always has to equal to something here it is an array

    case CREATE:
      console.log(action.payload);
      return [...posts, action.payload];

    case UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case LIKE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    case DELETE:
      return posts.filter((post) => post._id !== action.payload);

    default:
      return posts;
  }
};

export default reducer;
