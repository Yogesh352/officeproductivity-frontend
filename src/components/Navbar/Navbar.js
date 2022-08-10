import { useStateContext } from "../../context/ContextProvider";

import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import {
  ChatIcon,
  MenufoldIcon,
  MenuunfoldIcon,
  NotificationIcon,
} from "../Icon/index";

import UserProfile from "../Auth/UserProfile";
import { Group } from "@mantine/core";

const NavButton = ({ customFunc, icon, color }) => {
  return (
    <button
      onClick={() => customFunc()}
      style={{ color, border: "none", background: "none", cursor: "pointer" }}
      className="relative text-2xl p-1 hover:bg-light-gray"
    >
      {icon}
    </button>
  );
};

export default function Navbar() {
  const { activeMenu, setActiveMenu, setScreenSize, screenSize } =
    useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize && screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div
      className={`flex justify-between p-2 md:ml-6 md:mr-6 ${
        activeMenu ? "pr-72" : ""
      }`}
    >
      {!activeMenu ? (
        <NavButton
          customFunc={handleActiveMenu}
          color={"#D580FF"}
          icon={<MenuunfoldIcon />}
        />
      ) : (
        <NavButton
          customFunc={handleActiveMenu}
          color={"#D580FF"}
          icon={<MenufoldIcon />}
        />
      )}
      <div className="flex">
        <NavButton
          customFunc={() => <Link to="/chats" />}
          color={"#D580FF"}
          icon={<ChatIcon />}
        />
        <NavButton
          customFunc={() => <Link to="/notifications" />}
          color={"#D580FF"}
          icon={<NotificationIcon />}
        />
        <UserProfile />
      </div>
    </div>
  );
}
