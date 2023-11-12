import React from "react";
import Grid from "@mui/material/Grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MDTypography from "components/MDTypography";
import Box from "@mui/material/Box";
const MDCardHeader = ({ title, openModal }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={6} lg={10}>
        <MDTypography variant="span" color="white">
          {title} Master
        </MDTypography>
      </Grid>
      <Grid item xs={6} md={6} lg={2}>
        <Box display="flex" justifyContent="flex-end">
          <Tooltip title={`Add ${title}`}>
            <IconButton aria-label="plus" color="light" onClick={openModal}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MDCardHeader;
