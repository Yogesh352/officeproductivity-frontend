import { Avatar } from "@mantine/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import axios from "../../../axios/axios";

const Message = ({ message, own }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios("/user?userId=" + message?.sender);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [message?.sender]);
  return (
    <div className={`flex flex-col mt-5 ${own ? "items-end" : ""}`}>
      <div className="flex">
        {user?.profilePicture ? (
          <img
            className="w-10 h-10 rounded-full object-cover mr-5"
            src={user?.profilePicture}
            alt="Profile"
          />
        ) : (
          <Avatar
            className="w-10 h-10 rounded-full object-cover mr-5"
            radius="xl"
            size={30}
            alt={user?.name}
            src={user?.imageUrl}
          >
            {user?.name.charAt(0)}
          </Avatar>
        )}
        <p
          className={`p-4 rounded-md max-w-[300px]   ${
            own ? "bg-gray-300 text-black" : "bg-purple-500 text-white"
          }`}
        >
          {message?.text}
        </p>
      </div>
      <div className="text-xs text-gray-500 mt-4">
        {moment(message.createdAt).fromNow()}
      </div>
    </div>
  );
};

export default Message;
