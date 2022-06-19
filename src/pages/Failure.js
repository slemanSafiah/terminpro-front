import React from "react";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Failure() {
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
            src="assets/failure.png"
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
            width: "40%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="error"
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
