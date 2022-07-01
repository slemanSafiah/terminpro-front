import React, { useState, useRef } from "react";
import { DeleteRounded, AddRounded } from "@mui/icons-material";
import { Modal, Fade, Box, Backdrop, TextField, Button } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: "0px 0px 3px 2px rgba(100,100,100,0.5)",
  p: "32px 0 0 0",
};

export default function Category({ setCategories, category, grid }) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleInput() {
    axios({
      url: "https://terminpro2022.herokuapp.com/api/admin/category",
      method: "POST",
      data: {
        name: inputRef.current.value,
      },
    }).then((res) => {
      setCategories((prev) => [res.data.data, ...prev]);
      handleClose();
    });
  }

  function handleDelete() {
    axios({
      url: `https://terminpro2022.herokuapp.com/api/admin/category/${category._id}`,
      method: "DELETE",
    }).then(() => {
      setCategories((prev) => {
        return prev.filter((item) => {
          return item._id !== category._id;
        });
      });
    });
  }

  return (
    <>
      {category.name === "add" ? (
        <>
          {grid ? (
            <div className="category-container">
              <div className="category-add">
                <AddRounded
                  id="Add"
                  color="success"
                  fontSize="large"
                  onClick={handleOpen}
                />
              </div>
            </div>
          ) : (
            <div style={{ width: "100%", postion: "relative" }}>
              <AddRounded id="Add-list" color="success" onClick={handleOpen} />
            </div>
          )}
        </>
      ) : (
        <>
          {grid ? (
            <div className="category-container">
              <div className="category-title">{category.name}</div>
              <div className="category-subtitle">
                {new Date(category.createdAt).toLocaleString()}
              </div>
              <DeleteRounded
                className="category-option"
                color="error"
                onClick={handleDelete}
              />
            </div>
          ) : (
            <>
              <div className="category-record">
                <div>{category.name}</div>
                <div>{new Date(category.createdAt).toLocaleString()}</div>
                <div>
                  <DeleteRounded color="error" onClick={handleDelete} />
                </div>
              </div>
            </>
          )}
        </>
      )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div
              style={{
                color: "rgba(100, 100 ,100, 1)",
                fontSize: "1.3rem",
                textAlign: "center",
                width: "100%",
                fontFamily: "Poppins",
              }}
            >
              Add new Category
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <TextField
                sx={{
                  width: "40%",
                  margin: "30px 0px",
                }}
                label="Category"
                placeholder="Category"
                inputRef={inputRef}
              />
              <Button
                sx={{
                  height: "50px",
                  width: "20%",
                }}
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleInput}
              >
                {" "}
                Add{" "}
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
