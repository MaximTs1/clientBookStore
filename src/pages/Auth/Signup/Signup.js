import React, { useState, useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { structure, signupSchema } from "./SignupStructure";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../Spinner.css";
import "./Signup.css";
import axios from "axios";
import { PageHero } from "../../../components/General";

const defaultTheme = createTheme();

const Signup = () => {
  const [signupData, setsignupData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    const addSignupData = {
      ...signupData,
      [name]: value,
    };

    setsignupData(addSignupData);

    const validationResults = signupSchema.validate(addSignupData, {
      abortEarly: false,
      allowUnknown: true,
    });

    const newErrors = {};
    let hasErrors = false;

    if (validationResults.error) {
      validationResults.error.details.forEach((error) => {
        if (error.path && error.path.length > 0) {
          newErrors[error.path[0]] = error.message;
          hasErrors = true;
        }
      });
    }

    // Check for empty required fields
    structure.forEach((field) => {
      if (field.required && !addSignupData[field.name]) {
        newErrors[field.name] = "This field is required";
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    setIsValid(!hasErrors);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://ariellasv-api.onrender.com/user/signup",
        signupData
      );
      alert("New user was signed up successfully");
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "There was an error registering the user.";
      alert(errorMessage);
    }
  };

  return (
    <main>
      <PageHero title="Sign Up" />
      <div className="formContainer">
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                direction: "ltr",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  {structure.map((s) => (
                    <Grid key={s.name} item xs={12} sm={s.block ? 12 : 6}>
                      <TextField
                        name={s.name}
                        required={s.required}
                        fullWidth
                        id={s.name}
                        label={s.label}
                        type={
                          s.type === "password" && !showPassword
                            ? "password"
                            : "text"
                        }
                        error={!!errors[s.name]}
                        helperText={errors[s.name] || ""}
                        onChange={handleInputChange}
                        InputProps={
                          s.type === "password"
                            ? {
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                    >
                                      {showPassword ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }
                            : null
                        }
                      />
                    </Grid>
                  ))}
                </Grid>

                <Button
                  className={`spinner-button ${isValid ? "valid" : ""}`}
                  disabled={!isValid}
                  display={!isValid}
                  style={{ display: isValid ? "none" : "" }}
                  sx={{ mt: 2, mb: 0 }}
                >
                  <span className="spinner"></span>
                  {isValid ? "Valid" : "Finish the required field..."}
                </Button>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 3 }}
                  disabled={!isValid}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="center"></Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </main>
  );
};

export default Signup;
