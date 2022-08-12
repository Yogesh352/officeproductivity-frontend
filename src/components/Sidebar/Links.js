import { ChatIcon, DashboardIcon, TodoIcon, ContactsIcon } from "../Icon/index";

export const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "dashboard",
        to: "dashboard",
        icon: <DashboardIcon />,
      },
    ],
  },

  {
    title: "Team",
    links: [
      {
        name: "members",
        to: "members",
        icon: <ContactsIcon />,
      },
      {
        name: "chats",
        to: "chats",
        icon: <ChatIcon />,
      },
      {
        name: "social",
        to: "social",
        icon: <ContactsIcon />,
      },
    ],
  },
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
];
