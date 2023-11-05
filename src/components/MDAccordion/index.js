
import { forwardRef } from 'react';
import React from 'react'
import MDAccordianRoot from './MDAccordianRoot';
import PropTypes from "prop-types";
// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";
const MDAccordian = forwardRef(
  ({ name, color, variant, size, circular, iconOnly, children, ...rest }, ref) =>{
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    return (
      <MDAccordianRoot
        {...rest}
        ref={ref}
        color="primary"
        variant={variant === "gradient" ? "contained" : variant}
        size={size}
        ownerState={{ color, variant, size, circular, iconOnly, darkMode }}
      >
        {children}
      </MDAccordianRoot>
    );
  }
);


// Setting default values for the props of MDBox
MDAccordian.defaultProps = {
  variant: "contained",
  bgColor: "transparent",
  color: "dark",
  opacity: 1,
  borderRadius: "none",
  shadow: "none",
  coloredShadow: "none",
  name:""
};

// Typechecking props for the MDBox
MDAccordian.PropTypes = {
  name:PropTypes.string,
  variant: PropTypes.oneOf(["contained", "gradient"]),
  bgColor: PropTypes.string,
  color: PropTypes.string,
  opacity: PropTypes.number,
  borderRadius: PropTypes.string,
  shadow: PropTypes.string,
  coloredShadow: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "none",
  ]),
};

export default MDAccordian;
