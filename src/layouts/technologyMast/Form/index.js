import React, { useRef, useEffect } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";

const schema = Yup.object().shape({
  name: Yup.string().required("!!Please Provide Name"),
  email: Yup.string().required("!!Please Provide Email").email("!!Please Provide Valid Email"),
  phone: Yup.string()
    .required("!!Please Provide Contact Number")
    .min(10, "!!Minimum 10 digits allowed")
    .max(10, "!!Maximum 10 digits allowed"),
});
const EmpForm = ({ formValue, submit }) => {
  const ref = useRef();
  useEffect(() => {
    ref.current.resetForm();
    if (formValue) {
      ref.current.initialValues["name"] = formValue?.name;
      ref.current.initialValues["email"] = formValue?.email;
      ref.current.initialValues["phone"] = formValue?.phone;
      ref.current.initialValues["id"] = formValue?.id;
    }
  }, [formValue]);

  return (
    <Formik
      initialValues={{ name: "", email: "", phone: "", id: 0 }}
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
            <TextField
              error={props.errors.name && props.touched.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              type="text"
              label="Name"
              size="small"
              id="name"
              name="name"
              value={props.values.name}
              placeholder="Enter Name"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              helperText={<ErrorMessage name="name" />}
            />
            {/* <ErrorMessage name="name">
                      {msg => <div>{msg}</div>}
            </ErrorMessage> */}
          </Box>
          <Box
            component="div"
            sx={{
              "& .MuiTextField-root": { mt: 2, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              error={props.errors.email && props.touched.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              type="email"
              label="Email"
              value={props.values.email}
              size="small"
              id="email"
              name="email"
              placeholder="Enter Email"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              helperText={<ErrorMessage name="email" />}
            />
          </Box>
          <Box
            component="div"
            sx={{
              "& .MuiTextField-root": { mt: 2, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              error={props.errors.phone && props.touched.phone}
              type="text"
              label="Phone"
              value={props.values.phone}
              size="small"
              id="phone"
              name="phone"
              placeholder="Enter Contact Number"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              helperText={<ErrorMessage name="phone" />}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CallOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default EmpForm;
