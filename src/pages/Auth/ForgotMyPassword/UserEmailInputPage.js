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
import { ForgotPasswordEmailSchema } from "../ChangePassword/ChangePasswordStructure";
import { IconButton, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../Spinner.css";
import "../Signup/Signup.css";
import { GeneralContext } from "../../../App";
import { PageHero } from "../../../components/General";

const defaultTheme = createTheme();

const UserEmailInputPage = () => {
  const { user, setUser, snackbar } = useContext(GeneralContext);
  const navigate = useNavigate();

  const initializeUserData = () => ({
    email: "",
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
      const validationResults = ForgotPasswordEmailSchema.validate(userData, {
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
    try {
      const response = await fetch(
        `https://185.229.226.27:3001/user/forgot-password`, // Update the URL to your forgot password endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userData.email }),
        }
      );

      if (response.ok) {
        alert(
          "If your email is registered, you will receive a password reset link."
        );
        // Optionally redirect the user or give further instructions
        // navigate("/login"); // for example
      } else {
        const errorMessage = await response.text(); // or response.json() if your server sends JSON
        snackbar("there was an error, please try again");
      }
    } catch (error) {
      snackbar("there was an error, please try again");
    }
  };

  return (
    <main>
      <PageHero title="Forgot My Password" />
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
                Forgot My Password
              </Typography>

              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      value={userData.email}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      error={!!errors.email}
                      helperText={errors.email || ""}
                      onChange={handleInputChange}
                    />
                  </Grid>
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
                  Send Reset Link
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

export default UserEmailInputPage;
