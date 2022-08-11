import { Box, Group } from "@mantine/core";
import React from "react";

const TodoPriority = ({ priority }) => {
  let className =
    "inline-flex border h-10 border-solid p-2 text-xs rounded-full uppercase border-red-500 bg-red-100";
  priority === "low"
    ? (className =
        "inline-flex border h-10 border-solid p-2 text-xs rounded-full uppercase border-green-500 bg-green-100")
    : priority === "medium"
    ? (className =
        "inline-flex border h--10 border-solid p-2 text-xs rounded-full uppercase border-blue-500 bg-blue-100")
    : (className =
        "inline-flex border h-10 border-solid p-2 text-xs rounded-full uppercase border-red-500 bg-red-100");
  
        
  return <Group className={className}>{priority}</Group>;
};

export default TodoPriority;
