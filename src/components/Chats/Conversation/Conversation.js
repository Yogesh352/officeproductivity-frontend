import axios from "../../../axios/axios";
import React, { useState, useEffect } from "react";
import { titleCase } from "../../../functions/upperCase";
import { Avatar } from "@mantine/core";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation?.members?.find(
      (m) => m !== currentUser?.result._id
    );
    const getUser = async () => {
      try {
        const res = await axios("/user?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation.members]);

  return (
    <div className="flex items-center p-4 cursor-pointer hover:bg-gray-300">
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

      <span className="font-normal">{user && titleCase(user?.name)}</span>
    </div>
  );
};

export default Conversation;
