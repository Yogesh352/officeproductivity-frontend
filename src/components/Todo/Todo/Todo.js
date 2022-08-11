import {
  ActionIcon,
  Card,
  Checkbox,
  Group,
  Menu,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TodoPriority from "./TodoPriority";
import { format } from "date-fns";
import { completeTodo } from "../../../actions/todo";
import { DeleteIcon, DropdownMenuIcon, EditIcon } from "../../Icon";
import { Button } from "@material-ui/core";
import TodoForm from "../TodoForm/TodoForm";

function titleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
}

const Todo = ({ todo, currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const handleOpen = () => setFormOpen(true);
  const handleClose = () => setFormOpen(false);

  const handleConfirm = () => {
    dispatch(completeTodo(todo._id));
    setOpen(false);
  };

  return (
    <>
      <TodoForm
        currentId={currentId}
        setCurrentId={setCurrentId}
        open={formOpen}
        setOpen={setFormOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
      <Modal
        title="Completion comfirmation"
        opened={open}
        onClose={() => setOpen(false)}
      >
        <Stack>
          <Text>Is this task completed?</Text>
          <Group position="right">
            <Button variant="contained" color="primary" onClick={handleConfirm}>
              Yes
            </Button>
            <Button variant="contained" onClick={() => setOpen(false)}>
              No
            </Button>
          </Group>
        </Stack>
      </Modal>
      <Card className="flex justify-between flex-col w-full  rounded-md h-60 relative">
        <Group className="align-middle" position="apart">
          <Text weight={500} size="lg" mt="md">
            {todo.title}
          </Text>
          {todo.completed === false && (
            <Menu withinPortal position="bottom-end" shadow="sm">
              <Menu.Target>
                <ActionIcon>
                  <DropdownMenuIcon size={16} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => {
                    setCurrentId(todo._id);
                    setFormOpen(true);
                  }}
                  icon={<EditIcon />}
                >
                  Edit
                </Menu.Item>
                <Menu.Item icon={<DeleteIcon size={14} />} color="red">
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
        <Text color="gray">{moment(todo.createdAt).fromNow()}</Text>
        <Text className="line-clamp-2">{todo.description}</Text>
        <Group position="apart">
          <Text>
            <span className="text-gray-500">Assigned To: </span>
            {todo.assignee}
          </Text>
          <Text>
            <span className="text-gray-500">Assigned By: </span>
            {titleCase(todo.name)}
          </Text>
          <Group>
            <Text>
              <span className="text-gray-500">Priority: </span>
            </Text>
            <TodoPriority priority={todo.priority} />
          </Group>
        </Group>
        <Group position="apart">
          <Text>
            <span className="text-gray-500">Deadline: </span>
            {format(new Date(todo.deadline), "dd-MM-yyyy")}
          </Text>
          {todo.completed === false && (
            <Checkbox
              label="COMPLETED"
              onClick={() => {
                setOpen(true);
              }}
            />
          )}
        </Group>
      </Card>
    </>
  );
};

export default Todo;
