import { Card, Checkbox, Group, Text } from "@mantine/core";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import TodoPriority from "./TodoPriority";
import { format } from "date-fns";

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

const Todo = ({ todo, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  console.log(todo.creator);
  return (
    <Card className="flex justify-between flex-col w-full  rounded-md h-60 relative">
      <Group className="align-middle" position="apart">
        <Text weight={500} size="lg" mt="md">
          {todo.title}
        </Text>
        <Checkbox label="completed" />
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
      <Text>
        <span className="text-gray-500">Deadline: </span>
        {format(new Date(todo.deadline), "dd-MM-yyyy")}
      </Text>
    </Card>
  );
};

export default Todo;