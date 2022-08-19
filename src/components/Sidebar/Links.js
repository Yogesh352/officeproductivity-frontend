import { ChatIcon, TodoIcon, ContactsIcon } from "../Icon/index";

export const links = [
  {
    title: "Planning",
    links: [
      {
        name: "todo",
        to: "todo/pending",
        icon: <TodoIcon />,
      },
    ],
  },

  {
    title: "Team",
    links: [
      {
        name: "social",
        to: "social",
        icon: <ContactsIcon />,
      },
      {
        name: "chats",
        to: "chats",
        icon: <ChatIcon />,
      },

      {
        name: "members",
        to: "members",
        icon: <ContactsIcon />,
      },
    ],
  },
];
