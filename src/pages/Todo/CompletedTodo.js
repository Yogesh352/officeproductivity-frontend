import { Text } from "@mantine/core";
import { Container, Grid, Grow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTodos } from "../../actions/todo";
import NavigationControl from "../../components/Todo/NavigationControl/NavigationControl";
import TodoForm from "../../components/Todo/TodoForm/TodoForm";
import CompletedTodos from "../../components/Todo/Todos/CompletedTodos";

const CompletedTodo = () => {
  const [currentId, setCurrentId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [currentId, dispatch]);

  return (
    <div>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item>
              <Text className="text-2xl font-bold"> Completed Tasks </Text>
            </Grid>
            <Grid item>
              <NavigationControl />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <CompletedTodos setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
};

export default CompletedTodo;
