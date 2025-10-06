import { TextField } from "@mui/material";
import React, { forwardRef } from "react";
import { Controller } from "react-hook-form";

const ControlledTextField = forwardRef((props, ref) => {
  const { variant = "outlined", name, control, ...restProps } = props;
  if (control && typeof name === "string") {
    return (
      <Controller
        name={name}
        control={control}
        render={(args) => {
          return (
            <TextField
              variant={variant}
              {...restProps}
              {...args.field}
              ref={ref}
              error={args.fieldState.invalid}
              helperText={args.fieldState.error?.message}
            />
          );
        }}
      />
    );
  }
  return <TextField variant={variant} name={name} {...restProps} ref={ref} />;
});

export default ControlledTextField;
