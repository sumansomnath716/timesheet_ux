/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import React, { useState, useEffect } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data

/***
 * DATA TABLE
 */
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
/****
 * END
 */

import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

import MDDialog from "./dialog/index";

const tblColumn = [
  { field: "sl_no", header: "Sl No.", align: "center", minWidth: 16.6 },
  { field: "name", header: "Employee", align: "center", minWidth: 16.6 },
  { field: "email", header: "Email", align: "center", minWidth: 16.6 },
  { field: "phone", header: "Contact", align: "center", minWidth: 16.6 },
  { field: "toggle", header: "Status", align: "center", minWidth: 16.6 },
  { field: "edit", header: "Action", align: "center", minWidth: 16.6 },
];

// function MDdialog(items, visibility_status) {
//   console.log(visibility_status);
//   <MDDialog isOpen={visibility_status} items={items} />;
// }

function EmployeeMast() {
  // const { columns, rows } = authorsTableData();
  // const { columns: pColumns, rows: pRows } = projectsTableData();

  const [open, setOpen] = useState(false);

  const [selectedItems, setSelectedItems] = useState(null);

  const [employee, setEmployee] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => res.json())
      .then((json) => {
        setEmployee(json);
      });
  }, []);

  const handleChange = (rows, event) => {
    console.log(event.target.checked);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getRow = (rows) => {
    setOpen(true);
    setSelectedItems(rows);
  };

  return (
    // <div>Employee Bhai</div>
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="span" color="white">
                  Employee Master
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
                  <Table aria-label="a dense table">
                    <TableHead sx={{ display: "table-header-group" }}>
                      <TableRow>
                        {tblColumn.map((column) => (
                          <TableCell
                            key={column.field}
                            align={column.align}
                            sx={{ fontSize: 12, fontWeight: 600 }}
                          >
                            {column.header}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {employee
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          return (
                            <TableRow tabIndex={-1} key={row.id}>
                              {tblColumn.map((column) => {
                                let rowValue;
                                if (column.field === "sl_no") {
                                  rowValue = (
                                    <TableCell
                                      key={column.field}
                                      align={column.align}
                                      sx={{ fontSize: 13, fontWeight: 500 }}
                                    >
                                      {index + 1}
                                    </TableCell>
                                  );
                                } else if (column.field === "toggle") {
                                  rowValue = (
                                    <TableCell key={column.field} align={column.align}>
                                      <Switch
                                        color="primary"
                                        id={`active_${row.id}`}
                                        onChange={(ev) => handleChange(row, ev)}
                                        name={`active_${row.id}`}
                                      />
                                    </TableCell>
                                  );
                                } else if (column.field === "edit") {
                                  rowValue = (
                                    <TableCell key={column.field} align={column.align}>
                                      <IconButton
                                        aria-label="edit"
                                        color="info"
                                        onClick={() => getRow(row)}
                                      >
                                        <ModeEditOutlinedIcon />
                                      </IconButton>
                                    </TableCell>
                                  );
                                } else {
                                  rowValue = (
                                    <TableCell
                                      key={column.field}
                                      align={column.align}
                                      sx={{ fontSize: 13, fontWeight: 500 }}
                                    >
                                      {row[column.field]}
                                    </TableCell>
                                  );
                                }
                                return rowValue;
                              })}
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={employee.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <MDDialog isOpen={open} items={selectedItems} handleClose={handleClose} />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default EmployeeMast;
