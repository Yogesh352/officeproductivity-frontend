import {
    ChatIcon,
    DashboardIcon,
    TodoIcon,
    ContactsIcon,
  } from "../Icon/index";
  
  export const links = [
    {
      title: "Dashboard",
      links: [
        {
          name: "dashboard",
          icon: <DashboardIcon />,
        },
      ],
    },
  
    {
      title: "Team",
      links: [
        {
          name: "members",
          icon: <ContactsIcon />,
        },
        {
          name: "chats",
          icon: <ChatIcon />,
        },
      ],
    },
    {
      title: "Planning",
      links: [
        {
          name: "todo",
          icon: <TodoIcon />,
        },
      ],
    },
  ];