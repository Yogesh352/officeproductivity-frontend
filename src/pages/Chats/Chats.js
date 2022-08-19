import { Group, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../../actions/conversation";
import Conversation from "../../components/Chats/Conversation/Conversation";
import Message from "../../components/Chats/Message/Message";
import OnlineChat from "../../components/Chats/OnlineChat/OnlineChat";
import axios from "../../axios/axios";
import { AttachmentIcon } from "../../components/Icon";
import { io } from "socket.io-client";

const Chats = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);

  const submitDisabled = newMessage.length === 0;

  const user = JSON.parse(localStorage.getItem("profile"));
  const conversations = useSelector((state) => state.conversations);

  const scrollRef = useRef();
  const socket = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket?.current.emit("addUser", user?.result?._id);
    socket?.current.on("getUsers", (users) => {});
  }, [user?.result]);

  useEffect(() => {
    dispatch(getConversations(user.result._id));
  }, [dispatch, user.result._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user?.result?._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user?.result?._id
    );

    socket.current.emit("sendMessage", {
      senderId: user?.result?._id,
      receiverId: receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Text className="text-2xl font-bold pb-6"> Chats </Text>

      <Grid className="flex p-4" container alignItems="stretch" spacing={3}>
        <Grid
          className="bg-white border p-4 rounded-sm"
          item
          xs={12}
          sm={3}
          md={3}
        >
          <Text className="font-bold text-lg text-center justify-center items-center text-purple-400">
            Conversations
          </Text>
          {conversations.map((conversation) => (
            <div onClick={() => setCurrentChat(conversation)}>
              <Conversation
                key={conversation._id}
                conversation={conversation}
                currentUser={user}
              />
            </div>
          ))}
        </Grid>
        <Grid
          className="bg-white border p-4 rounded-sm"
          item
          xs={12}
          sm={9}
          md={9}
        >
          <div className="relative flex  flex-col justify-between">
            {currentChat ? (
              <div className="flex flex-col mb-4 p-4 h-[65vh] overflow-y-scroll">
                {messages.length !== 0 ? (
                  messages.map((message) => (
                    <div ref={scrollRef}>
                      <Message
                        key={message._id}
                        message={message}
                        own={message.sender === user?.result?._id}
                      />
                    </div>
                  ))
                ) : (
                  <Text className="justify-center relative items-center text-center text-gray-400">
                    Enter a Message to start a conversation
                  </Text>
                )}
              </div>
            ) : (
              <span className="pt-12 text-xl text-gray-500 text-center items-center justify-center">
                Open a conversation to start a chat
              </span>
            )}
            {currentChat ? (
              <>
                <form onSubmit={handleSubmit}>
                  <Stack className="box-shadow-md">
                    <Stack
                      spacing={0}
                      className="w-full border-solid-border-gray"
                    >
                      <Textarea
                        onChange={(e) => {
                          setNewMessage(e.target.value);
                        }}
                        value={newMessage}
                        className="w-full"
                        placeholder="Enter Message..."
                      />
                      <Group
                        className="bg-white border-solid border-gray-900 p-2"
                        position="apart"
                      >
                        <label htmlFor="img">
                          <AttachmentIcon
                            className="h-10 cursor-pointer"
                            size={18}
                            color="grey"
                          />
                        </label>
                        <input
                          type="file"
                          id="img"
                          accept="image/*"
                          style={{ display: "none" }}
                        />
                        <Button
                          disabled={submitDisabled}
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          Send
                        </Button>
                      </Group>
                    </Stack>
                  </Stack>
                </form>
              </>
            ) : null}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Chats;
