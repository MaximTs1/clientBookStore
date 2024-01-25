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
import {
  resetPasswordStructure,
  ResetPasswordSchema,
} from "../ChangePassword/ChangePasswordStructure";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import "../../Spinner.css";
import "../Signup/Signup.css";
import { GeneralContext } from "../../../App";
import { PageHero } from "../../../components/General";

const defaultTheme = createTheme();

const ChangePasswordLandingPage = () => {
  const { user, setUser } = useContext(GeneralContext);
  const navigate = useNavigate();
  const location = useLocation();

  const initializeUserData = () => ({
    resetPassword: "",
    confirmResetPassword: "",
  });

  const [userData, setUserData] = useState(initializeUserData);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    setUserData({ ...userData, [name]: value });
    setHasInteracted(true);
  };

  useEffect(() => {
    // Only perform validation if the user has interacted with the input fields
    if (hasInteracted) {
      const validationResults = ResetPasswordSchema.validate(userData, {
        abortEarly: false,
        allowUnknown: true,
      });

      const newErrors = {};
      if (validationResults.error) {
        validationResults.error.details.forEach((error) => {
          if (error.path && error.path.length > 0) {
            newErrors[error.path[0]] = error.message;
          }
        });
      }

      setErrors(newErrors);
      setIsValid(Object.keys(newErrors).length === 0);
    }
  }, [userData, hasInteracted]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract the token from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    try {
      const response = await fetch(
        "https://185.229.226.27:3001/user/reset-password",
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            resetPassword: userData.resetPassword,
          }),
        }
      );

      if (response.ok) {
        alert("Password reset successfully");
        navigate("/login");
      } else {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json(); // Parse as JSON
          console.error("Error:", data.message);
          alert(data.message); // Display JSON error message
        } else {
          const text = await response.text(); // Read as plain text
          console.error("Error:", text);
          alert(text); // Display plain text error message
        }
      }
    } catch (error) {
      console.error("Network or parsing error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const [passwordVisibility, setPasswordVisibility] = useState({
    resetPassword: false,
    confirmResetPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <main>
      <PageHero title="Change My Password" />
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
              <Avatar sx={{ mt: 0, mb: 2, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Create New Password
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  {resetPasswordStructure.map((s) => (
                    <Grid key={s.name} item sm={s.block ? 12 : 6}>
                      <TextField
                        name={s.name}
                        value={userData[s.name]}
                        required={s.required}
                        fullWidth
                        id={s.name}
                        label={s.label}
                        type={
                          s.type === "password" && !passwordVisibility[s.name]
                            ? "password"
                            : "text"
                        }
                        sx={{ mt: 0, mb: 3 }}
                        error={!!errors[s.name]}
                        helperText={errors[s.name] || ""}
                        onChange={handleInputChange}
                        InputProps={{
                          endAdornment:
                            s.type === "password" ? (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    togglePasswordVisibility(s.name)
                                  }
                                  edge="end"
                                >
                                  {passwordVisibility[s.name] ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ) : null,
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>

                <Button
                  className={`spinner-button ${isValid ? "valid" : ""}`}
                  disabled={!isValid}
                  style={{ display: isValid ? "none" : "" }}
                  sx={{
                    mt: 4,
                    mb: 2,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <span className="spinner"></span>
                  {isValid ? "Valid" : "Finish the required field..."}
                </Button>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 5, textAlign: "center" }}
                  disabled={!isValid}
                >
                  Create New Password
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

export default ChangePasswordLandingPage;
