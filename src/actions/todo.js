import * as api from "../api";
import {
  FETCH_ALL,
  DELETE,
  UPDATE,
  CREATE,
  COMPLETE,
} from "../constants/actionTypes";

//Action creators
export const getTodos = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTodos();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createTodo = (todo) => async (dispatch) => {
  try {
    const { data } = await api.createTodo(todo);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = (id, todo) => async (dispatch) => {
  try {
    const { data } = await api.updateTodo(id, todo);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    await api.deleteTodo(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const completeTodo = (id) => async (dispatch) => {
  try {
    const { data } = await api.completeTodo(id);

    dispatch({ type: COMPLETE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
