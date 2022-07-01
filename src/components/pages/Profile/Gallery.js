import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Empty } from "antd";
import { v4 } from "uuid";
import Delete from "@mui/icons-material/Delete";
import axios from "axios";

export default function Gallery({ images, userId }) {
  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    setImgs(images);
  }, [images]);

  function handleDelete(item) {
    axios({
      url: `http://localhost:5000/api/user/${userId}/gallery`,
      method: "DELETE",
      data: {
        img: item,
      },
    });
    console.log(item);
    setImgs((prev) => {
      return prev.filter((i) => {
        return i !== item;
      });
    });
  }
  const mediaQuery = window.matchMedia("(max-width: 600px)");

  return (
    <>
      {!imgs || imgs?.length === 0 ? (
        <Empty
          style={{
            color: "gray",
            fontFamily: "Poppins",
            margin: "16px 0px",
          }}
        />
      ) : (
        <ImageList
          sx={{
            width: "100%",
            height: 350,
            backgroundColor: "rgb(230,230,230)",
          }}
          cols={mediaQuery.matches ? 2 : 3}
          rowHeight={170}
        >
          {imgs?.map((item) => (
            <div
              style={{
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  zIndex: 1,
                  left: "5%",
                  top: "5%",
                }}
              >
                <Delete color="error" onClick={() => handleDelete(item)} />
              </div>
              <ImageListItem key={v4()}>
                <img
                  src={item}
                  className="gallery-img"
                  alt={"salon"}
                  loading="lazy"
                />
              </ImageListItem>
            </div>
          ))}
        </ImageList>
      )}
    </>
  );
}
