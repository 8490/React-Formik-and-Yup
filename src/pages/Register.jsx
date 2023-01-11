import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/result.svg";
import Grid from "@mui/material/Grid";

import { Link, useNavigate } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import useAuthCalls from "../hooks/useAuthCalls";

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .max(10, "username must have less than 10 chars")
    .required(),
  first_name: yup
    .string()
    .max(20, "first name must have less than 20 chars")
    .required(),
  last_name: yup
    .string()
    .max(20, "last name must have less than 20 chars")
    .required(),

  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8, "Password must have min 8 chars")
    .max(16, "Password must have max 16 chars")
    .matches(/\d+/, "Password must have a number")
    .matches(/[a-z]+/, "Password must have a lowercase")
    .matches(/[A-Z]+/, "Password must have an uppercase")
    .matches(/[!,?{}><%&$#£+-.]+/, " Password must have a special char"),
});

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuthCalls();

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        rowSpacing={{ sm: 3 }}
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h3" color="primary" align="center">
            STOCK APP
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={2}
            color="secondary.light"
          >
            Register
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={registerSchema}
            onSubmit={(values, actions) => {
              register({ ...values, password2: values.password });
              navigate("/stock");
              actions.resetForm();
              actions.setSubmitting(false);
            }}
          >
            {({
              values,
              isSubmitting,
              handleChange,
              handleBlur,
              touched,
              errors,
            }) => (
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    label="User Name"
                    name="username"
                    id="userName"
                    type="text"
                    variant="outlined"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.username && errors.username}
                    error={touched.username && Boolean(errors.username)}
                  />
                  <TextField
                    label="First Name"
                    name="first_name"
                    id="firstName"
                    type="text"
                    variant="outlined"
                    value={values.first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.first_name && errors.first_name}
                    error={touched.first_name && Boolean(errors.first_name)}
                  />
                  <TextField
                    label="Last Name"
                    name="last_name"
                    id="last_name"
                    type="text"
                    variant="outlined"
                    value={values.last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.last_name && errors.last_name}
                    error={touched.last_name && Boolean(errors.last_name)}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.email && errors.email}
                    error={touched.email && Boolean(errors.email)}
                  />
                  <TextField
                    label="password"
                    name="password"
                    id="password"
                    type="password"
                    variant="outlined"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.password && errors.password}
                    error={touched.password && Boolean(errors.password)}
                  />
                  <LoadingButton
                    type="submit"
                    // loading={loading}
                    loadingPosition="center"
                    variant="contained"
                  >
                    Submit
                  </LoadingButton>
                </Box>
              </Form>
            )}
          </Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/">I have an account !</Link>
          </Box>
        </Grid>

        <Grid item xs={0} sm={7} md={6}>
          <Container>
            <img src={image} alt="" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
