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
import { completeTodo, deleteTodo } from "../../../actions/todo";
import { DeleteIcon, DropdownMenuIcon, EditIcon, ExpandIcon } from "../../Icon";
import { Button } from "@material-ui/core";
import TodoForm from "../TodoForm/TodoForm";
import ExpandedTodo from "./ExpandedTodo";
import { titleCase } from "../../../functions/upperCase";

const Todo = ({ todo, currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [expandOpen, setExpandOpen] = useState(false);

  const handleOpen = () => setFormOpen(true);
  const handleClose = () => {
    setFormOpen(false);
  };

  const handleConfirm = () => {
    dispatch(completeTodo(todo._id));
    setOpen(false);
  };

  const expandHandleOpen = () => {
    setExpandOpen(true);
  };

  const expandHandleClose = () => {
    setExpandOpen(false);
  };

  return (
    <>
      {currentId !== null && (
        <ExpandedTodo
          currentId={currentId}
          setCurrentId={setCurrentId}
          open={expandOpen}
          setOpen={setExpandOpen}
          handleOpen={expandHandleOpen}
          handleClose={expandHandleClose}
        />
      )}
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
          <Group>
            <ExpandIcon
              className="cursor-pointer"
              onClick={() => {
                setCurrentId(todo._id);
                setExpandOpen(true);
              }}
            />
            {todo.completed === false && user?.result?._id === todo?.creator && (
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
                  <Menu.Item
                    onClick={() => {
                      dispatch(deleteTodo(todo._id));
                    }}
                    icon={<DeleteIcon size={14} />}
                    color="red"
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>
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
              className="cursor-pointer"
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
