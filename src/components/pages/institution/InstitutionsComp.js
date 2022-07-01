import React, { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { Empty } from "antd";
import axios from "axios";

export default function InstitutionsComp() {
  const [category, setCategory] = useState(null);
  const [insts, setInsts] = useState([]);
  const [page, setPage] = React.useState(0);
  const [categories, setCategories] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    axios({
      url: "https://terminpro2022.herokuapp.com/api/admin/category",
      method: "GET",
    }).then((res) => {
      setCategories((prev) => {
        return res.data.data.map((cat) => cat.name);
      });
    });
  }, []);

  useEffect(() => {
    axios({
      url: `https://terminpro2022.herokuapp.com/api/user/institutions?cat=${category}`,
      method: "GET",
    }).then((res) => {
      console.log(res.data);
      setInsts(res.data);
    });
  }, [category]);

  return (
    <div className="insts-container">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={categories}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Catergory" />}
        value={category}
        onChange={(e, nv) => setCategory(nv)}
      />
      {insts?.length > 0 ? (
        <TableComp
          insts={insts}
          page={page}
          rowsPerPage={rowsPerPage}
          changeRowsperPage={handleChangeRowsPerPage}
          changePage={handleChangePage}
        />
      ) : (
        <Empty
          style={{
            padding: "5em",
            fontFamily: "Poppins",
            color: "gray",
          }}
          description={"Select Category Please"}
        />
      )}
    </div>
  );
}

function TableComp({
  insts,
  page,
  rowsPerPage,
  changePage,
  changeRowsperPage,
}) {
  const mediaQuery = window.matchMedia("(max-width: 600px)");

  if (mediaQuery.matches) {
    return (
      <>
        <TableContainer className="inst-table" component={Paper}>
          <Table
            sx={{ minWidth: 300, margin: "0 auto" }}
            aria-label="simple table"
          >
            <TableBody>
              {insts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((inst) => {
                  return (
                    <>
                      <TableRow>
                        {inst.img ? (
                          <img
                            src={inst?.img}
                            alt="salon"
                            className="inst-table-img"
                          />
                        ) : (
                          <Empty description="" />
                        )}
                      </TableRow>
                      <TableRow>
                        <div className="inst-table-content">
                          <div className="inst-table-title">
                            {inst.institutionName}
                          </div>

                          <div className="inst-table-location">
                            {inst.location}
                          </div>
                          <Link to={`/institution/${inst._id}`}>
                            <div className="inst-table-button">More Info</div>
                          </Link>
                        </div>
                      </TableRow>
                    </>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="inst-table-pagination">
          <TablePagination
            sx={{
              width: "100%",
            }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={insts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={changePage}
            onRowsPerPageChange={changeRowsperPage}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <TableContainer className="inst-table" component={Paper}>
        <Table sx={{ minWidth: 600, maxWidth: 1200 }} aria-label="simple table">
          <TableBody>
            {insts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((inst) => {
                return (
                  <TableRow>
                    <TableCell
                      sx={{ width: `${mediaQuery.matches ? "30%" : "40%"}` }}
                    >
                      {inst.img ? (
                        <img
                          src={inst?.img}
                          alt="salon"
                          className="inst-table-img"
                        />
                      ) : (
                        <Empty description="" />
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="inst-table-content">
                        <div className="inst-table-title">
                          {inst.institutionName}
                        </div>

                        <div className="inst-table-location">
                          {inst.location}
                        </div>
                        <Link to={`/institution/${inst._id}`}>
                          <div className="inst-table-button">More Info</div>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="inst-table-pagination">
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={insts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={changePage}
          onRowsPerPageChange={changeRowsperPage}
        />
      </div>
    </>
  );
}
