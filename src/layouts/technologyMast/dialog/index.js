import React from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TechForm from "../Form/index";
import axios from "axios";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MDDialog = ({ isOpen, handleClose, items, addOrEditRow }) => {
  const addOrEditForm = (emp_dtls) => {
    // addOrEditRow(emp_dtls);
    // handleClose();
    axios
      .post("/technology/modify", {
        dt: emp_dtls,
      })
      .then((response) => {
        addOrEditRow(response.data.data);
        handleClose();
      });
  };
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle sx={{ fontSize: 12 }}>{"Employee Entry Form"}</DialogTitle>
      <DialogContent>
        <TechForm formValue={items} submit={addOrEditForm} />
      </DialogContent>
      <DialogActions>
        <Button type="submit" form="techFrm">
          Submit
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MDDialog;
