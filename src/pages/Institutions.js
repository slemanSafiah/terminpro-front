import React from "react";

import Header from "../components/shared/Header";
import InstitutionsComp from "../components/pages/institution/InstitutionsComp";
import Footer from "../components/shared/Footer";

import "./inst.css";

export default function Institutions() {
  return (
    <div>
      <Header />
      <InstitutionsComp />
      <Footer />
    </div>
  );
}
