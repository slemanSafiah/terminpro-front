import React from "react";
import { Delete, Update } from "@mui/icons-material";
import { Empty } from "antd";
import axios from "axios";

export default function Services({
  setType,
  openModal,
  services,
  setServices,
  setModified,
}) {
  return (
    <>
      {services.length === 0 ? (
        <Empty
          style={{
            color: "gray",
            fontFamily: "Poppins",
            margin: "16px 0px",
          }}
        />
      ) : (
        <div className="profile-services">
          {services.map((ser, index) => {
            return (
              <Service
                key={index}
                ser={ser}
                setType={setType}
                openModal={openModal}
                setServices={setServices}
                setModified={setModified}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

function Service({ ser, setType, openModal, key, setServices, setModified }) {
  const mediaQuery = window.matchMedia("(max-width: 600px)");

  return (
    <div
      style={
        mediaQuery.matches
          ? {
              display: "flex",
              height: "auto",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "space-between",
              backgroundColor: "white",
              padding: "1em",
              margin: "1em 0em",
            }
          : {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "white",
              padding: "1em",
              margin: "1em 0em",
            }
      }
    >
      <div className="profile-service-details">
        <div
          style={
            mediaQuery.matches
              ? {
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }
              : {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }
          }
        >
          <div
            style={
              mediaQuery.matches
                ? {
                    width: "70%",
                    paddingBottom: "8px",
                  }
                : {}
            }
          >
            <div
              style={{
                fontSize: "1rem",
              }}
            >
              {ser.name}
            </div>
            <div className="profile-service-desc">{ser.description}</div>
          </div>
          <div className="profile-service-price-time">
            <div>{ser.price} $</div>
            <div>{ser.time} Min</div>
          </div>
        </div>
      </div>
      <div className="profile-service-icons">
        <Update
          color="warning"
          onClick={(e) => {
            e.preventDefault();
            setType("update service");
            setModified(ser._id);
            openModal();
          }}
        />
        <Delete
          color="error"
          onClick={(e) => {
            e.preventDefault();
            axios({
              url: `http://localhost:5000/api/service/${ser._id}`,
              method: "DELETE",
            }).then(() => {
              setServices((prev) => {
                return prev.filter((item) => {
                  return item._id !== ser._id;
                });
              });
            });
          }}
        />
      </div>
    </div>
  );
}
