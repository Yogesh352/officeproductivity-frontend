import { Group, Modal, Stack, Text } from "@mantine/core";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { titleCase } from "../../../functions/upperCase";
import TodoPriority from "./TodoPriority";
import { format } from "date-fns";

const ExpandedTodo = ({
  currentId,
  setCurrentId,
  open,
  setOpen,
  handleOpen,
  handleClose,
}) => {
  const todo = useSelector((state) =>
    currentId ? state.todos.find((p) => p._id === currentId) : null
  );
  return (
    <Modal title="Detailed View" opened={open} onClose={() => setOpen(false)}>
      <Stack spacing={10}>
        <Text weight={500} size="lg" mt="md">
          {todo?.title}
        </Text>
        <Text color="gray">{moment(todo?.createdAt).fromNow()}</Text>
        <Text>{todo?.description}</Text>
        <Group position="apart">
          <Text>
            <span className="text-gray-500">Assigned To: </span>
            {todo?.assignee}
          </Text>
          <Text>
            <span className="text-gray-500">Assigned By: </span>
            {todo && todo.name && titleCase(todo && todo?.name)}
          </Text>
        </Group>
        <Group position="apart">
          <Group>
            <Text>
              <span className="text-gray-500">Priority: </span>
            </Text>
            <TodoPriority priority={todo?.priority} />
          </Group>
          <Text>
            <span className="text-gray-500">Deadline: </span>
            {todo && format(new Date(todo?.deadline), "dd-MM-yyyy")}
          </Text>
        </Group>
      </Stack>
    </Modal>
  );
};

export default ExpandedTodo;
