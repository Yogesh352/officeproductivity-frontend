import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);

export const fetchTodos = () => API.get("/todo");
export const createTodo = (newTodo) => API.post("/todo", newTodo);
export const updateTodo = (id, updatedTodo) =>
  API.patch(`/todo/${id}`, updatedTodo);
export const deleteTodo = (id) => API.delete(`/todo/${id}`);
export const completeTodo = (id) => API.patch(`/todo/${id}/completeTodo`);
