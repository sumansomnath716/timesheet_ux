import React from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import EmpForm from "../Form/index";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MDDialog = ({ isOpen, handleClose, items, addOrEditRow }) => {
  const addOrEditForm = (emp_dtls) => {
    addOrEditRow(emp_dtls);
    handleClose();
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
        <EmpForm formValue={items} submit={addOrEditForm} />
      </DialogContent>
      <DialogActions>
        <Button type="submit" form="empFrm">
          {" "}
          Submit{" "}
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MDDialog;
