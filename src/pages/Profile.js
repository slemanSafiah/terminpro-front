import React from "react";

import Header from "../components/shared/Header";
import ProfileComp from "../components/pages/Profile/ProfileComp";
import Footer from "../components/shared/Footer";

import "./profile.css";

export default function Profile() {
  return (
    <div>
      <Header />
      <ProfileComp />
      <Footer />
    </div>
  );
}
