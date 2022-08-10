import { Box, Group } from "@mantine/core";
import React from "react";

const TodoPriority = ({ priority }) => {
  let color = "red";
  priority === "low"
    ? (color = "green")
    : priority === "medium"
    ? (color = "blue")
    : (color = "red");
  return (
    <Group
      className={`inline-flex border h-10 border-solid p-2 text-xs rounded-full uppercase border-${color}-500 bg-${color}-100`}
    >
      {priority}
    </Group>
  );
};

export default TodoPriority;
