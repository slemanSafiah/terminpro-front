import React from "react";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();
  const mediaQuery = window.matchMedia("(max-width: 600px)");

  return (
    <div>
      <Header />
      <div
        style={
          mediaQuery.matches
            ? {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                flexDirection: "column",
              }
            : {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }
        }
      >
        <div
          style={
            mediaQuery.matches
              ? {
                  width: "auto",
                }
              : {
                  width: "50%",
                }
          }
        >
          <img
            src="assets/success.png"
            alt="payment done"
            height={mediaQuery.matches ? "250px" : "500px"}
            style={
              mediaQuery.matches
                ? {
                    marginTop: "150px",
                  }
                : {
                    marginTop: "4em",
                    objectFit: "cover",
                  }
            }
          />
        </div>
        <div
          style={
            mediaQuery.matches
              ? {
                  height: "100px",
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }
              : {
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }
          }
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
