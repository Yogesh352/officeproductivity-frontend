import { FETCH_ALL, CREATE } from "../constants/actionTypes";

const reducer = (conversations = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload; //state always has to equal to something here it is an array

    case CREATE:
      console.log(action.payload);
      return [...conversations, action.payload];

    default:
      return conversations;
  }
};

export default reducer;
