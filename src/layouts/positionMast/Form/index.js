import React, { useRef, useEffect, useState } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

/*** FOR SELECT MATERIAL BOX */
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
/*** END */

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import LinkIcon from "@mui/icons-material/Link";
import InfoIcon from "@mui/icons-material/Info";

const schema = Yup.object().shape({
  proj_name: Yup.string().required("!!Please Provide Project"),
});
const PosForm = ({ formValue, submit }) => {
  const ref = useRef();
  const [technology_mst, setTechnology] = useState([]);
  const [assign_members, setassignMembers] = useState([]);

  useEffect(() => {
    //     ref.current.resetForm();
    //     if (formValue) {
    //       ref.current.initialValues["name"] = formValue?.name;
    //       ref.current.initialValues["email"] = formValue?.email;
    //       ref.current.initialValues["phone"] = formValue?.phone;
    //       ref.current.initialValues["id"] = formValue?.id;
    //     }
  }, [formValue]);

  return (
    <Formik
      initialValues={{
        pos_type: "",
        pos_dtls: "",
      }}
      validationSchema={schema}
      innerRef={ref}
      onSubmit={(values, { resetForm }) => {
        submit(values);
        resetForm();
      }}
    >
      {(props) => (
        <form id="empFrm" onSubmit={props.handleSubmit} autoComplete="off">
          <Box
            component="div"
            sx={{
              "& .MuiTextField-root": { mt: 2, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            {/* PROJECT NAME */}
            <TextField
              error={props.errors.pos_type && props.touched.pos_name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountTreeIcon />
                  </InputAdornment>
                ),
              }}
              type="text"
              label="Position Type"
              size="small"
              id="pos_type"
              name="pos_type"
              value={props.values.pos_type}
              placeholder="Enter Type"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              helperText={<ErrorMessage name="pos_type" />}
            />
          </Box>
          {/* END */}
          {/* PROJECT URL */}
          <Box
            component="div"
            sx={{
              "& .MuiTextField-root": { mt: 2, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            {/* <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkIcon />
                  </InputAdornment>
                ),
              }}
              type="text"
              label="Position"
              size="small"
              id="pos_name"
              name="pos_name"
              value={props.values.pos_name}
              placeholder="Position"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            /> */}
          </Box>
          {/* END */}

          {/* PROJECT Details */}
          <Box
            component="div"
            sx={{
              "& .MuiTextField-root": { mt: 2, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            {/* InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InfoIcon />
                  </InputAdornment>
                ),
              }} */}
            <TextField
              type="text"
              label="Position Details"
              size="small"
              id="pos_dtls"
              multiline
              maxRows={4}
              name="pos_dtls"
              value={props.values.pos_dtls}
              placeholder="Details"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </Box>
          {/* END */}
        </form>
      )}
    </Formik>
  );
};

export default PosForm;
