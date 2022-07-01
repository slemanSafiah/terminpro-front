import React, { useState, useEffect } from "react";
import { GridOn, GridOff } from "@mui/icons-material";
import { Grid, CircularProgress } from "@mui/material";
import Category from "./Category";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [grid, setGrid] = useState(true);

  useEffect(() => {
    axios({
      url: "https://terminpro2022.herokuapp.com/api/admin/category",
      method: "GET",
    }).then((res) => {
      setCategories([...res.data.data, { name: "add" }]);
    });
  }, []);

  const changeType = () => {
    setGrid((prev) => !prev);
  };

  return (
    <div className="container">
      <div style={{ position: "relative" }}>
        <div className="title">Categories</div>
        <div
          style={{
            position: "absolute",
            right: "5%",
            top: "5%",
          }}
        >
          {grid ? (
            <GridOn onClick={changeType} />
          ) : (
            <GridOff onClick={changeType} />
          )}
        </div>
        {categories?.length > 0 ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "auto",
            }}
          >
            {grid ? (
              <Grid
                style={{
                  boxShadow: "inset 0px 0px 3px gray",
                  padding: "20px",
                  overflowY: "scroll",
                  height: "500px",
                }}
                container
                rowSpacing={2}
              >
                {categories.map((cat) => {
                  return (
                    <Grid
                      item
                      xs={4}
                      sx={{
                        width: "225px",
                        height: "200px",
                      }}
                    >
                      <Category
                        setCategories={setCategories}
                        category={cat}
                        grid={true}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <div
                style={{
                  boxShadow: "inset 0px 0px 3px gray",
                  padding: "20px",
                  width: "100%",
                  overflowY: "scroll",
                  height: "500px",
                }}
              >
                <Table categories={categories} setCategories={setCategories} />
              </div>
            )}
          </div>
        ) : (
          <CircularProgress
            style={{
              marginLeft: "50%",
              transform: "translateX(-50%)",
              marginTop: "200px",
            }}
          />
        )}
      </div>
    </div>
  );
}

function Table({ categories, setCategories }) {
  return (
    <>
      <div className="category-table">
        <div>category</div>
        <div>created at</div>
        <div>action</div>
      </div>
      {categories.map((cat) => {
        return (
          <Category setCategories={setCategories} category={cat} grid={false} />
        );
      })}
    </>
  );
}
