import { Group, Modal, NativeSelect, Textarea, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { Button, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodo, getTodos, updateTodo } from "../../../actions/todo";
import useStyles from "./styles";

const TodoForm = ({
  currentId,
  setCurrentId,
  open,
  setOpen,
  handleOpen,
  handleClose,
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const todo = useSelector((state) =>
    currentId ? state.todos.find((p) => p._id === currentId) : null
  );

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [todoData, setTodoData] = useState({
    title: "",
    description: "",
    assignee: "",
    deadline: new Date(),
    priority: "",
  });

  const clear = () => {
    setTodoData({
      title: "",
      description: "",
      assignee: "",
      deadline: new Date(),
      priority: "",
    });
    setCurrentId(null);
  };

  useEffect(() => {
    if (todo) {
      setTodoData(todo);
    } else {
      setTodoData({
        title: "",
        description: "",
        assignee: "",
        deadline: new Date(),
        priority: "",
      });
    }
  }, [todo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === null) {
      await dispatch(
        createTodo({
          ...todoData,
          name: user?.result?.name,
          creator: user?.result?._id,
        })
      );

      clear();
    } else {
      await dispatch(
        updateTodo(currentId, { ...todoData, name: user?.result?.name })
      ).then(dispatch(getTodos()));

      clear();
    }
    handleClose();
  };

  const notdisabled = Object.values(todoData).every(
    (todo) => todo.length !== 0
  );

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)}>
        <Paper className={`${classes.root} ${classes.form} p-2`}>
          <form
            autoComplete="off"
            noValidate
            className={classes.form}
            onSubmit={handleSubmit}
          >
            <Typography variant="h6">
              {currentId ? "Editing" : "Creating"} a task
            </Typography>

            <TextInput
              label="Title"
              required
              className="w-full p-2"
              size="lg"
              placeholder="Title"
              value={todoData.title}
              onChange={(e) =>
                setTodoData({ ...todoData, title: e.target.value })
              }
            />
            <Textarea
              label="Description"
              className="w-full p-2"
              required
              size="lg"
              placeholder="Description"
              value={todoData.description}
              onChange={(e) =>
                setTodoData({ ...todoData, description: e.target.value })
              }
            />
            <TextInput
              label="Assignee"
              required
              className="w-full p-2"
              size="lg"
              placeholder="Assignee"
              value={todoData.assignee}
              onChange={(e) =>
                setTodoData({ ...todoData, assignee: e.target.value })
              }
            />
            <NativeSelect
              label="Priority"
              required
              value={todoData.priority}
              placeholder="Priority"
              className="w-full p-2"
              size="lg"
              onChange={async (e) => {
                setTodoData({ ...todoData, priority: e.target.value });
              }}
              data={[
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High" },
              ]}
            />
            <DatePicker
              label="Deadline"
              required
              className="w-full p-2"
              size="lg"
              placeholder="Pick deadline"
              value={todoData.deadline}
              onChange={(item) => {
                setTodoData({ ...todoData, deadline: item });
              }}
            />
            <Group position="right">
              <Button
                variant="contained"
                color="primary"
                disabled={!notdisabled}
                type="submit"
              >
                Submit
              </Button>
              <Button variant="contained" onClick={clear}>
                Clear
              </Button>
            </Group>
          </form>
        </Paper>
      </Modal>
    </>
  );
};

export default TodoForm;
