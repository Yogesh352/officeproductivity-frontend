import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chats from "./pages/Chats/Chats";
import Layout from "./components/Layout/Layout";
import Members from "./pages/Members/Members";
import Todo from "./pages/Todo/Todo";
import Auth from "./pages/Auth/Auth";
import CompletedTodo from "./pages/Todo/CompletedTodo";
import Posts from "./pages/Post/Posts";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Todo />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/members" element={<Members />} />
          <Route path="/todo/pending" element={<Todo />} />
          <Route path="/todo/completed" element={<CompletedTodo />} />
          <Route path="/social" element={<Posts />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
