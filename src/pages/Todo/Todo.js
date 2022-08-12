import { Group, Text } from "@mantine/core";
import { Button, Container, Grid, Grow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { completeTodo, getTodos, updateTodo } from "../../actions/todo";
import NavigationControl from "../../components/Todo/NavigationControl/NavigationControl";
import TodoForm from "../../components/Todo/TodoForm/TodoForm";
import Todos from "../../components/Todo/Todos/Todos";

const Todo = () => {
  const [currentId, setCurrentId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setCurrentId(null);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
              <Text className="text-2xl font-bold"> Pending Tasks </Text>
            </Grid>
            <Grid item>
              <Group>
                <NavigationControl />
                <Button
                  style={{
                    backgroundColor: "#D580FF",
                  }}
                  onClick={handleOpen}
                  variant="contained"
                >
                  Create Todo
                </Button>
                <TodoForm
                  currentId={currentId}
                  setCurrentId={setCurrentId}
                  open={open}
                  setOpen={setOpen}
                  handleOpen={handleOpen}
                  handleClose={handleClose}
                />
              </Group>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Todos currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
};

export default Todo;
