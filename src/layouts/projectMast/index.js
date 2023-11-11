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
// import DataTable from "examples/Tables/DataTable";

// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";

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
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";
/****
 * END
 */

import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import MDDialog from "./dialog/index";

const tblColumn = [
  { field: "sl_no", header: "Sl No.", align: "center", minWidth: 16.6 },
  { field: "proj_name", header: "Project", align: "center", minWidth: 16.6 },
  { field: "proj_url", header: "Project URL", align: "center", minWidth: 16.6 },
  { field: "proj_status", header: "Status", align: "center", minWidth: 16.6 },
  { field: "edit", header: "Edit", align: "center", minWidth: 16.6 },
  { field: "delete", header: "Delete", align: "center", minWidth: 16.6 },
];

function ProjectMast() {
  // const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };
  // const { columns, rows } = authorsTableData();
  // const { columns: pColumns, rows: pRows } = projectsTableData();

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("sl_no");

  const [open, setOpen] = useState(false);

  const [selectedItems, setSelectedItems] = useState(null);

  const [project, setProject] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const addOrEditRow = (emp) => {
    setProject((prev) =>
      prev.map((item) => {
        if (item.id === emp.id) {
          item.proj_name = emp.proj_name;
          item.proj_url = emp.proj_url;
          item.proj_dtls = emp.proj_dtls;
        }
        return item;
      })
    );
  };

  useEffect(() => {
    // fetch(`https://jsonplaceholder.typicode.com/users`)
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setEmployee(json);
    //   });
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

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
  // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
  // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
  // with exampleArray.slice().sort(exampleComparator)
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleRequestSort = (event, property) => {
    console.log(property);
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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
                  Project Master
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <TableContainer component={Paper} sx={{ boxShadow: "none", maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead sx={{ display: "table-header-group" }}>
                      <TableRow>
                        {tblColumn.map((column) => (
                          <TableCell
                            sortDirection={orderBy === column.field ? order : false}
                            key={column.field}
                            align={column.align}
                            sx={{ fontSize: 12, fontWeight: 600 }}
                          >
                            {column.field !== "edit" && column.field !== "delete" ? (
                              <TableSortLabel
                                active={orderBy === column.field}
                                direction={orderBy === column.field ? order : "asc"}
                                onClick={createSortHandler(column.field)}
                              >
                                {column.header}
                                {orderBy === column.field ? (
                                  <Box component="span" sx={visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                  </Box>
                                ) : null}
                              </TableSortLabel>
                            ) : (
                              column.header
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {project
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
                                } else if (column.field === "proj_status") {
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
                                } else if (column.field === "delete") {
                                  <TableCell key={column.field} align={column.align}>
                                    <IconButton aria-label="edit" color="danger">
                                      <DeleteOutlinedIcon />
                                    </IconButton>
                                  </TableCell>;
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
                  count={project.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <MDDialog
                  isOpen={open}
                  items={selectedItems}
                  addOrEditRow={addOrEditRow}
                  handleClose={handleClose}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ProjectMast;
