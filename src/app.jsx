import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const App = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    console.log("SUBMIT", data);
    localStorage.setItem("user", JSON.stringify(data));
  };
  console.log("ERRORS: ", errors);

  const handleClickOnLink = (event) => {
    event.preventDefault();
    console.log("Go to Link");
  };

  const legacyLabel = (
    <>
      <span>I agree to the </span>
      <Link
        href="#"
        color="inherit"
        underline="always"
        onClick={handleClickOnLink}>
        terms of service
      </Link>
      <span>, </span>
      <Link
        href="#"
        color="inherit"
        underline="always"
        onClick={handleClickOnLink}>
        privacy policy
      </Link>
      <span>, </span>
      <Link
        href="#"
        color="inherit"
        underline="always"
        onClick={handleClickOnLink}>
        electronic communications disclosure
      </Link>
      <span>, and </span>
      <Link
        href="#"
        color="inherit"
        underline="always"
        onClick={handleClickOnLink}>
        electronic funds transfer disclosure
      </Link>
      <span>.</span>
    </>
  );

  return (
    <Box
      component="form"
      sx={{
        fontFamily: "Montserrat, sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxShadow: 16, // theme.shadows[1]
        color: "primary.main", // theme.palette.primary.main
        my: 3,
        mx: "auto", // margin: theme.spacing(1)
        px: 6.25, // [theme.breakpoints.up('xs')]: { padding: theme.spacing(1) },
        zIndex: "tooltip", // theme.zIndex.tooltip
        width: "470px",
      }}
      onSubmit={handleSubmit(onSubmit)}>
      <h4
        style={{
          fontWeight: "normal",
          margin: "30px 0 14px",
          color: "#23252E",
        }}>
        Become a farmland investor
      </h4>
      <TextField
        id="First Name"
        label="First Name"
        variant="standard"
        margin="normal"
        {...register("First name", { required: true, maxLength: 80 })}
      />
      <TextField
        id="Last Name"
        label="Last Name"
        variant="standard"
        margin="normal"
        {...register("Last name", { required: true, maxLength: 100 })}
      />
      <TextField
        id="Password"
        label="Password"
        variant="standard"
        margin="normal"
        {...register("Password", {
          required: true,
          minLength: 7,
          pattern: /\d+/g,
        })}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
          type: showPassword ? "text" : "password",
        }}
      />
      <TextField
        id="Email"
        label="Email"
        placeholder="abc@box.com"
        variant="standard"
        margin="normal"
        {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
      />
      <TextField
        id="Phone"
        label="Phone"
        placeholder="+1(XXX)XXX-XXXX"
        variant="standard"
        margin="normal"
        type="tel"
        {...register("Phone", {
          required: true,
          minLength: {
            value: 6,
            message: "Min value is 6", // JS only: <p>error message</p> TS only support string
            pattern: /\d+/g,
          },
          maxLength: 14,
        })}
      />
      <FormControlLabel
        margin="normal"
        control={
          <Checkbox
            {...register("License", { required: true })}
            defaultChecked
          />
        }
        sx={{
          m: "16px 0 8px",
          color: "black",
          fontFamily: "Montserrat, sans-serif",
        }}
        label={legacyLabel}
      />
      <Button
        variant="contained"
        type="submit"
        color="warning"
        sx={{
          mt: 2,
          mb: 6,
          fontFamily: "Montserrat, sans-serif",
        }}>
        Continue
      </Button>
      <DevTool control={control} /> {/* set up the dev tool */}
    </Box>
  );
};
export default App;
