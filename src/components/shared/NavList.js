import React from "react";
import { Link } from "react-router-dom";

import "./header.css";

export default function NavList() {
  return (
    <ul className="header-nav-list">
      <Link to={"/"}>
        <li>Home</li>
      </Link>
      <Link to="/about">
        <li>About</li>
      </Link>
      <Link to={"/contact"}>
        <li>Contact</li>
      </Link>
    </ul>
  );
}
