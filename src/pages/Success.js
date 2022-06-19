import React from "react";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{
            width: "50%",
          }}
        >
          <img
            src="assets/success.png"
            alt="payment done"
            height="500px"
            style={{
              marginTop: "4em",
              objectFit: "cover",
            }}
          />
        </div>
        <div
          style={{
            width: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={(e) => {
              navigate("/");
            }}
          >
            {" "}
            GO TO HOME PAGE
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
