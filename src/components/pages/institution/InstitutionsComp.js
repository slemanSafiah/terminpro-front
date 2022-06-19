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
import Rating from "@mui/material/Rating";
import { Empty } from "antd";
import axios from "axios";

const Categories = ["Hair Cut", "Health Care", "Beauty Care"];

export default function InstitutionsComp() {
  const [category, setCategory] = useState(null);
  const [insts, setInsts] = useState([]);
  const [page, setPage] = React.useState(0);
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
      url: `http://localhost:5000/api/user/institutions?cat=${category}`,
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
        options={Categories}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Catergory" />}
        value={category}
        onChange={(e, nv) => setCategory(nv)}
      />
      {insts ? (
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
          }}
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
  return (
    <>
      <TableContainer className="inst-table" component={Paper}>
        <Table sx={{ minWidth: 650, maxWidth: 1200 }} aria-label="simple table">
          <TableBody>
            {insts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((inst) => {
                return (
                  <TableRow>
                    <TableCell sx={{ width: "40%" }}>
                      <img
                        src={inst.img}
                        alt="salon"
                        className="inst-table-img"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="inst-table-content">
                        <div className="inst-table-title">
                          {inst.institutionName}
                        </div>
                        <div className="inst-table-rate">
                          <Rating
                            name="half-rating"
                            defaultValue={inst.rate}
                            precision={0.1}
                            readOnly
                          />
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
