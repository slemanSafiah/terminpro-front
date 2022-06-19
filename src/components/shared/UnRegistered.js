import React from "react";
import { Link } from "react-router-dom";

export default function UnRegistered() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Poppins",
      }}
    >
      <Link to={"/login"}>
        <span style={{ margin: "0 1em", cursor: "pointer", color: "white" }}>
          {" "}
          Login{" "}
        </span>
      </Link>
      <Link to={"/signup"}>
        <span style={{ margin: "0 1em", cursor: "pointer", color: "white" }}>
          {" "}
          Signup{" "}
        </span>
      </Link>
    </div>
  );
}
