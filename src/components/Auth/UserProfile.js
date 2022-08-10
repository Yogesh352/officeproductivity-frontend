import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { LOGOUT } from "../../constants/actionTypes";

import decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { Avatar, Space, Text } from "@mantine/core";

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

const UserProfile = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) handleSignOut();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const handleSignOut = () => {
    dispatch({ type: LOGOUT });

    navigate("/");

    setUser(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar
          radius="xl"
          size={30}
          alt={user.result.name}
          src={user.result.imageUrl}
        >
          {user.result.name.charAt(0)}
        </Avatar>
        <Space w="xs" />
        <Text size="sm">{titleCase(user.result.name)}</Text>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/profile">
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <Link to="/auth">
          <MenuItem onClick={handleSignOut}>Log Out</MenuItem>
        </Link>
      </Menu>
    </div>
  );
};

export default UserProfile;
