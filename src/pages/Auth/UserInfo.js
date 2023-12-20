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
import "../Spinner.css";
import "./Signup.css";
import { GeneralContext } from "../../App";
import { PageHero } from "../../components/General";

const defaultTheme = createTheme();

const UserInfo = () => {
  const { user, setUser } = useContext(GeneralContext);
  const navigate = useNavigate();

  // Function to initialize userData
  const initializeUserData = () => ({
    customId: user?.customId || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    email: user?.email || "",
    city: user?.city || "",
    street: user?.street || "",
    houseNumber: user?.houseNumber || "",
    zip: user?.zip || "",
  });

  const [userData, setUserData] = useState(initializeUserData);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData(initializeUserData());
    }
  }, [user]);

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    setUserData(initializeUserData()); // Resets user data
    setErrors({}); // Resets any errors
    setIsValid(false); // Resets validation state
    // Add any other state resets here
  }, []);

  useEffect(() => {
    const validationResults = signupSchema.validate(userData, {
      abortEarly: false,
      allowUnknown: true,
    });

    const newErrors = {};
    if (validationResults.error) {
      validationResults.error.details.forEach((error) => {
        if (error.path && error.path.length > 0) {
          if (error.path[0] !== "password") {
            // Exclude errors related to the "password" field
            newErrors[error.path[0]] = error.message;
          }
        }
      });
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [userData]);

  // useEffect(() => {
  //   const validationResults = signupSchema.validate(userData, {
  //     abortEarly: false,
  //     allowUnknown: true,
  //   });

  //   const newErrors = {};
  //   if (validationResults.error) {
  //     validationResults.error.details.forEach((error) => {
  //       if (error.path && error.path.length > 0) {
  //         newErrors[error.path[0]] = error.message;
  //       }
  //     });
  //   }

  //   setErrors(newErrors);
  //   setIsValid(Object.keys(newErrors).length === 0);
  // }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://185.229.226.27:3001/user/get-user-info/${userData.customId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.token,
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating user");
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setUserData(initializeUserData(""));
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main>
      <PageHero title="User Info" />
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
                    {structure.map((s) => {
                      // Exclude the 'password' field from the input fields
                      if (s.name !== "password") {
                        return (
                          <Grid key={s.name} item xs={15} sm={s.block ? 12 : 6}>
                            <TextField
                              name={s.name}
                              value={userData[s.name]}
                              required={s.required}
                              fullWidth
                              id={s.name}
                              label={s.label}
                              type={s.type}
                              error={!!errors[s.name]}
                              helperText={errors[s.name] || ""}
                              onChange={handleInputChange}
                            />
                          </Grid>
                        );
                      }
                      return null; // Exclude 'password' field
                    })}
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
                    Update User Details
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

export default UserInfo;
