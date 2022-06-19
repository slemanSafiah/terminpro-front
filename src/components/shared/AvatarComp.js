import React from "react";

import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import "./header.css";

function stringToColor(string) {
  let hash = 0;
  let i;
  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      fontSize: "1rem",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function AvatarComp({ name, func }) {
  let history = useNavigate();
  return (
    <div
      style={{
        width: "200px",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <div
        className="logout"
        onClick={(e) => {
          e.preventDefault();
          history("/login");
          localStorage.removeItem("token");
        }}
      >
        logout
      </div>
      <div
        className="header-avatar"
        onClick={(e) => {
          e.preventDefault();
          history("/profile");
        }}
      >
        <Avatar {...stringAvatar(name)} />
      </div>
    </div>
  );
}
