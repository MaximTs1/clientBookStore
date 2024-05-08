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
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import { GeneralContext } from "../../../App";
import { structure, loginSchema } from "./LoginStructure";
import "../Signup/Signup.css";
import { PageHero } from "../../../components/General";

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { setLoading, snackbar, setUser, user } = useContext(GeneralContext);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    setloginData({ ...loginData, [name]: value });
  };

  useEffect(() => {
    const validationResults = loginSchema.validate(loginData, {
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
  }, [loginData]);

  const handlePasswordChange = (ev) => {
    const { name, value } = ev.target;
    setloginData({ ...loginData, [name]: value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://ariellasv-api.onrender.com/user/login", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text().then((x) => {
            throw new Error(x);
          });
        }
      })
      .then((data) => {
        localStorage.token = data.token;
        setUser(data);
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        snackbar("Email or password are incorrect, please try again");
        // alert(err);
      })
      .finally(() => {});
  };

  return (
    <main>
      <PageHero title="Log in" />
      <div className="formContainer">
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Log in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                {structure.map((s) => (
                  <Grid key={s.name} item xs={12} sm={6} sx={{ mb: 3 }}>
                    <TextField
                      name={s.name}
                      value={loginData[s.name]}
                      required={s.required}
                      fullWidth
                      id={s.name}
                      label={s.label}
                      type={
                        s.name === "password" && !showPassword
                          ? "password"
                          : "text"
                      }
                      error={!!errors[s.name]}
                      autoComplete={s.name}
                      helperText={errors[s.name] || ""}
                      onChange={
                        s.name === "password"
                          ? handlePasswordChange
                          : handleInputChange
                      }
                      InputProps={
                        s.name === "password"
                          ? {
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
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
                  Log in
                </Button>
                <Grid container justifyContent="center">
                  <Grid item sx={{ mt: 1, mb: 2 }}>
                    <Button variant="outlined" component={Link} to="/signup">
                      להרשמה לחץ כאן
                    </Button>
                  </Grid>
                </Grid>
                <Grid container justifyContent="center">
                  <Grid item sx={{ mt: 1, mb: 2 }}>
                    <Button component={Link} to="/forgotmypasswordpage">
                      שכחתי סיסמא
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </main>
  );
}
