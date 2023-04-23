import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import axios from "axios";

function TableCom({
  handleClickOpen,
  handleDeleteStaff,
  setUserEdit,
  setSelectedRole,
  setSelectedStore,
  salesManagers,
  storeManagers,
  salesPurchaseManagers,
  getRoles,
}) {
  const [staff, setStaff] = useState([]);
  const [storeId, setStoreId] = useState(
    "b78a77e4-5063-4810-b8cb-0de1b9c3f099"
  );
  const [rows, setRow] = useState(-1);

  const getStaff = async () => {
    const response = await axios.post(
      "http://stock.staging.digitalregister.in:8080/api/v1/staff/get",
      {
        businessIds: ["kbktbFmdvENXoEriN0UD7VboJET2"],
      }
    );
    const res = await response;
    setStaff(res.data.response);
  };

  const getRole = (id) => {
    if (salesManagers.find((item) => item.staffModel.staffId === id)) {
      return "Sales Manager";
    } else if (
      salesPurchaseManagers.find((item) => item.staffModel.staffId === id)
    ) {
      return "Sales Purchase Manager";
    } else if (storeManagers.find((item) => item.staffModel.staffId === id)) {
      return "Store Manager";
    } else {
      return "No Role";
    }
  };

  const openEdit = (user) => {
    setUserEdit(user);
    handleClickOpen();
    setSelectedStore(storeId);
  };

  useEffect(() => {
    getStaff();
    getRoles();
  }, [staff]);

  // const classes = useStyles();

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Staff</TableCell>
              <TableCell>Mobile No</TableCell>
              <TableCell>Row</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staff?.map((row, index) => {
              return (
                <TableRow
                  key={row?.id}
                  onMouseOver={() => {
                    setRow(index);
                  }}
                  onMouseLeave={() => {
                    setRow(-1);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row?.name}
                  </TableCell>
                  <TableCell>{row?.mobile}</TableCell>
                  <TableCell>{getRole(row?.staffId)}</TableCell>
                  <TableCell align="right">
                    <div>
                      <Button
                        variant="outlined"
                        sx={{
                          textTransform: "none",
                          backgroundColor: "#ffffff",
                          color: "#000000",
                          borderColor: "#000000",
                          visibility: rows === index ? "visible" : "hidden",
                        }}
                        onClick={() => openEdit(row)}
                      >
                        Change Role
                      </Button>
                      <Button
                        variant="outlined"
                        // color="black"
                        sx={{
                          textTransform: "none",
                          backgroundColor: "#ffffff",
                          color: "#000000",
                          borderColor: "#000000",
                          visibility: rows === index ? "visible" : "hidden",
                        }}
                        onClick={() => openEdit(row)}
                      >
                        {getRole(row.staffId) === "No Role"
                          ? "Add Role"
                          : "Remove Role"}
                      </Button>

                      <Button
                        variant="outlined"
                        // color="black"
                        sx={{
                          textTransform: "none",
                          backgroundColor: "#ffffff",
                          color: "#000000",
                          borderColor: "#000000",
                          visibility: rows === index ? "visible" : "hidden",
                        }}
                        onClick={() => openEdit(row)}
                      >
                        Rename Staff
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{
                          textTransform: "none",
                          backgroundColor: "#ffffff",
                          color: "#FF0202",
                          borderColor: "#FF0202",
                          visibility: rows === index ? "visible" : "hidden",
                        }}
                        onClick={() => handleDeleteStaff(row.staffId)}
                      >
                        Delete Staff
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableCom;
