import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  FormControlLabel,
  Link,
  FormControl,
  FormHelperText,
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
        error={errors["First name"]}
        id="First Name"
        label="First Name"
        variant="standard"
        margin="normal"
        helperText={errors["First name"] ? errors["First name"].message : null}
        {...register("First name", {
          required: { value: true, message: "Поле обязательно для заполнения" },
          maxLength: 80,
        })}
      />
      <TextField
        error={errors["Last name"]}
        helperText={errors["Last name"] ? errors["Last name"].message : null}
        id="Last Name"
        label="Last Name"
        variant="standard"
        margin="normal"
        {...register("Last name", {
          required: { value: true, message: "Поле обязательно для заполнения" },
          maxLength: 100,
        })}
      />
      <TextField
        error={errors.Password}
        helperText={errors.Password ? errors.Password.message : null}
        id="Password"
        label="Password"
        variant="standard"
        margin="normal"
        {...register("Password", {
          required: { value: true, message: "Поле обязательно для заполнения" },
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
        error={errors.Email}
        helperText={errors.Email ? errors.Email.message : null}
        id="Email"
        label="Email"
        placeholder="abc@box.com"
        variant="standard"
        margin="normal"
        {...register("Email", {
          required: { value: true, message: "Поле обязательно для заполнения" },

          pattern: {
            value: /^\S+@\S+$/i,
            message: "Email введен некорректно. Шаблон abc@abc.com",
          },
        })}
      />
      <TextField
        error={errors.Phone}
        helperText={errors.Phone ? errors.Phone.message : null}
        id="Phone"
        label="Phone"
        placeholder="+1(XXX)XXX-XXXX"
        variant="standard"
        margin="normal"
        type="tel"
        {...register("Phone", {
          required: {
            value: true,
            message: "Поле обязательно для заполнения",
          },
          minLength: {
            value: 6,
            message: "Не менее 6 и не более 14 символов", // JS only: <p>error message</p> TS only support string\
          },

          maxLength: 15,
          pattern: {
            value: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
            message: `Телефон не соответсвует шаблону.
              Шаблоны: +79261234567, 89261234567, 8(926)123-45-67, (495) 123 45 67, 8 927 1234 234 и пр.`,
          },
        })}
      />
      <FormControl
        error={errors.License}
        helperText={errors.License ? errors.License.message : null}
        margin="normal">
        <FormControlLabel
          control={
            <Checkbox
              {...register("License", {
                required: {
                  value: true,
                  message: "Необходимо ваше согласие",
                },
              })}
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
        {errors.License ? (
          <FormHelperText>{errors.License.message}</FormHelperText>
        ) : null}
      </FormControl>
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
