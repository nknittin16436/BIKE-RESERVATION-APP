import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SignUpSchema } from "../../JoiSchema/Schema";
import { registerUser } from "../../Service/UserService";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";

const theme = createTheme();

const SignUp = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = new FormData(event.currentTarget);
      const email = data.get("email");
      data.set(
        "email",
        email.slice(0, email.indexOf("@")).toLowerCase() +
          email.slice(email.indexOf("@"))
      );
      console.log(
        data.get("name"),
        data.get("email"),
        data.get("password"),
        data.get("confirmPassword")
      );

      await SignUpSchema.validateAsync({
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
        confirmPassword: data.get("confirmPassword"),
      });

      setLoading(true);
      const res = await registerUser({
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
        confirmPassword: data.get("confirmPassword"),
      });
      if (res.success) {
        setLoading(false);
        alert.show("Registerd Succesfully Login to Continue");
        navigate("/login");
      } else {
        alert.show("Some error occured Please try again");
      }
    } catch (error) {
      setLoading(false);
      alert.show(error.message);
    }
  };

  return (
    <div className="signup__homepage">
      {loading ? (
        <Loader />
      ) : (
        <div className="signup__hompepage__container">
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
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
                        autoComplete="given-name"
                        name="name"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="confirmPassword"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link to="/login">Already have an account? Sign in</Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </div>
      )}
    </div>
  );
};

export default SignUp;
