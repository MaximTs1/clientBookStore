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
import { structure, ChangePasswordSchema } from "./ChangePasswordStructure";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../Spinner.css";
import "../Signup/Signup.css";
import { GeneralContext } from "../../../App";
import { PageHero } from "../../../components/General";

const defaultTheme = createTheme();

const ChangePassword = () => {
  const { user, setUser } = useContext(GeneralContext);
  const navigate = useNavigate();

  const initializeUserData = () => ({
    email: user?.email || "",
    password: "",
    newPassword: "",
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
      const validationResults = ChangePasswordSchema.validate(userData, {
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
        `http://185.229.226.27:3001/user/update-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.token,
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        alert("Password Changed successfully!");
        navigate("/");
        // Password updated successfully
        // Redirect to a success page or display a success message
      } else {
        // Handle errors, such as incorrect current password or server errors
        const errorMessage = await response.text();
        // Display the error message to the user or handle it as needed
        console.error("Error updating password:", errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle network errors or other exceptions
    }
  };

  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    newPassword: false,
    confirmNewPassword: false,
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
              {user && (
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    {structure.map((s) => (
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
                    Change my password
                  </Button>
                  <Grid container justifyContent="center"></Grid>
                </Box>
              )}
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </main>
  );
};

export default ChangePassword;
