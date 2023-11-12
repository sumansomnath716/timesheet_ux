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
const ProjForm = ({ formValue, submit }) => {
  const ref = useRef();
  const [technology_mst, setTechnology] = useState([]);
  const [assign_members, setassignMembers] = useState([]);

  useEffect(() => {
    ref.current.resetForm();
    if (formValue) {
      ref.current.initialValues["proj_name"] = formValue?.proj_name;
      ref.current.initialValues["proj_url"] = formValue?.proj_url;
      ref.current.initialValues["proj_dtls"] = formValue?.proj_dtls;
      ref.current.initialValues["id"] = formValue?.id;
    }
  }, [formValue]);

  return (
    <Formik
      initialValues={{
        proj_name: "",
        id: 0,
        proj_url: "",
        proj_dtls: "",
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
              error={props.errors.proj_name && props.touched.proj_name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountTreeIcon />
                  </InputAdornment>
                ),
              }}
              type="text"
              label="Project"
              size="small"
              id="proj_name"
              name="proj_name"
              value={props.values.proj_name}
              placeholder="Enter Project"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              helperText={<ErrorMessage name="proj_name" />}
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
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkIcon />
                  </InputAdornment>
                ),
              }}
              type="text"
              label="Project URL"
              size="small"
              id="proj_url"
              name="proj_url"
              value={props.values.proj_url}
              placeholder="www.abcd.com"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
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
              label="Project Details"
              size="small"
              id="proj_dtls"
              multiline
              maxRows={4}
              name="proj_dtls"
              value={props.values.proj_dtls}
              placeholder="www.abcd.com"
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

export default ProjForm;
