import React from "react";

import Header from "../components/shared/Header";
import ProfileComp from "../components/pages/Profile/ProfileComp";
import Footer from "../components/shared/Footer";
import { useAtom } from "jotai";
import userAtom from "../components/atoms/userAtom";
import { Navigate } from "react-router-dom";
import "./profile.css";

export default function Profile() {
  const [user, _] = useAtom(userAtom);

  if (user.type === "admin") {
    return <Navigate to={"/admin"} replace={true} />;
  }

  return (
    <div>
      <Header />
      <ProfileComp />
      <Footer />
    </div>
  );
}
