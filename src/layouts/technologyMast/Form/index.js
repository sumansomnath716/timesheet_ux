import React, { useRef, useEffect, useState } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import TechType from "../../../assets/Json/TechType";

import FormControl from "@mui/material/FormControl";

/*** SELECT DROPDOWN FOR MATERIAL */
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
/*** END  */
import FormHelperText from "@mui/material/FormHelperText";
const schema = Yup.object().shape({
  tech_name: Yup.string().required("!!Please Provide Technology"),
  tech_type_id: Yup.string().required("!!Please Provide Technology Type"),
});
const TechForm = ({ formValue, submit }) => {
  const ref = useRef();
  const [techType, setTechType] = useState(TechType);
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
      initialValues={{ tech_name: "", tech_type_id: "", tech_dtls: "", id: 0 }}
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
              "& .MuiTextField-root": { mt: 2, mb:2, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              error={props.errors.tech_name && props.touched.tech_name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BiotechOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              type="text"
              label="Technology"
              size="small"
              variant="outlined"
              id="tech_name"
              name="tech_name"
              value={props.values.tech_name}
              placeholder="Enter Technology"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              helperText={<ErrorMessage name="tech_name" />}
            />
          </Box>
          <FormControl  sx= {{width:'100%'}} 
          error={props.errors.tech_type_id && props.touched.tech_type_id}
          >
          <InputLabel id="tech_type_id">Technology Type</InputLabel>
            <Select
              
              labelId="tech_type_id"
              id="tech_type_id"
              style={{height:38 }}
              value={props.values.tech_type_id}
              label="Technology Type"
              onChange={props.handleChange}
              name="tech_type_id"
              fullWidth
            >
              <MenuItem value="">
                <em>Select Technology Type</em>
              </MenuItem>
              {techType.map((el) => {
                return (
                  <MenuItem value={el.id} key={el.id}>
                    {el.tech_type}
                  </MenuItem>
                );
              })}
            </Select>
            <ErrorMessage name="tech_type_id" />
          </FormControl>
          <Box
            component="div"
            sx={{
              "& .MuiTextField-root": { mt: 2, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              error={props.errors.tech_dls && props.touched.tech_dls}
              type="text"
              label="Technology Details"
              value={props.values.email}
              size="small"
              id="tech_dls"
              name="tech_dls"
              placeholder="Enter Technology Details"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              helperText={<ErrorMessage name="tech_dls" />}
            />
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default TechForm;
