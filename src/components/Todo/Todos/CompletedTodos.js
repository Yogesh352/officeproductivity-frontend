import React from "react";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import Todo from "../Todo/Todo";
import { Text } from "@mantine/core";

const CompletedTodos = ({ setCurrentId }) => {
  const todos = useSelector((state) =>
    state.todos.filter((p) => p.completed === true)
  );

  return !todos.length ? (
    <Text>No Completed Tasks</Text>
  ) : (
    <Grid
      className="flex items-center"
      container
      alignItems="stretch"
      spacing={3}
    >
      {todos.map((todo) => (
        <Grid key={todo._id} item xs={12} sm={6} md={6}>
          <Todo todo={todo} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CompletedTodos;
