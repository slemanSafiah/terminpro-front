import React from "react";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";

import "./about.css";

export default function About() {
  return (
    <>
      <Header />
      <img
        className="about-background"
        src="assets/about.jpg"
        alt="about terminpro"
      />
      <div
        style={{
          backgroundColor: "white",
          marginTop: "60vh",
          width: "100%",
        }}
      >
        <div className="about-title">About Us</div>
        <div className="about-content">
          Mollit pariatur ad et ipsum anim excepteur nostrud laboris consectetur
          cillum occaecat anim. Ea veniam eiusmod ea magna eu sunt laborum.
          Lorem dolore exercitation do dolore ullamco. Incididunt enim ex
          pariatur tempor elit qui magna eiusmod exercitation pariatur pariatur.
          Ea nostrud fugiat anim mollit labore culpa nisi reprehenderit aliquip
          culpa quis sit ad commodo. Excepteur consectetur in voluptate esse
          commodo occaecat proident pariatur aliqua. Enim eiusmod ex in sunt ut
          voluptate ullamco magna ut occaecat. Mollit pariatur ad et ipsum anim
          excepteur nostrud laboris consectetur cillum occaecat anim. Ea veniam
          eiusmod ea magna eu sunt laborum. Lorem dolore exercitation do dolore
          ullamco. Incididunt enim ex pariatur tempor elit qui magna eiusmod
          exercitation pariatur pariatur. Ea nostrud fugiat anim mollit labore
          culpa nisi reprehenderit aliquip culpa quis sit ad commodo. Excepteur
          consectetur in voluptate esse commodo occaecat proident pariatur
          aliqua. Enim eiusmod ex in sunt ut voluptate ullamco magna ut
          occaecat.
        </div>
      </div>
      <Footer />
    </>
  );
}
