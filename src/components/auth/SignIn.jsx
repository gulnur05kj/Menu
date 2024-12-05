import React from "react";
import { Button, Paper, styled, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { validationSignIn } from "../../utils/constants/validation";
import { useDispatch } from "react-redux";
import { signInThunk } from "../../redux/slices/authSlices";

export const SignIn = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState("");
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSignIn,

    onSubmit: async (values) => {
      try {
        const newData = {
          ...values,
          role:
            values.email === "admin@gmail.com" && values.password === "Admin123"
              ? "ADMIN"
              : "USER",
        };

        dispatch(signInThunk(newData));
        console.log("Успешно вошли в систему:", response.data);

        navigate("/");
      } catch (error) {
        const message = error.response?.data?.message || "Ошибка входа";
        setErrorMessage(message);
      }
    },
  });

  return (
    <PaperWrapper
      elevation={3}
      sx={{
        width: "400px",
        padding: "20px",
        margin: "100px  auto",
      }}
    >
      <Typography variant="h5" textAlign={"center"} margin="15px 0">
        Войти в аккаунт
      </Typography>

      <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
        <WrapperInput>
          <StyledInput
            label="Почта"
            fullWidth
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <ErrorMessage>{formik.errors.email}</ErrorMessage>
          )}
        </WrapperInput>

        <WrapperInput>
          <StyledInput
            label="Пароль"
            fullWidth
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <ErrorMessage>{formik.errors.password}</ErrorMessage>
          )}
        </WrapperInput>

        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: "12px" }}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Отправка..." : "Войти"}
        </Button>

        <StyledTypography variant="inherit">
          <StyledLink to={"/sign-up"}>Зарегистрироваться</StyledLink>
        </StyledTypography>
      </form>
    </PaperWrapper>
  );
};

const StyledInput = styled(TextField)(({ theme }) => ({
  margin: "10px auto",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const PaperWrapper = styled(Paper)(({ theme }) => ({
  width: "400px",
  padding: "20px",
  margin: "100px auto",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    margin: "50px auto",
  },
}));

export const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "#ADADAD",
});

export const StyledTypography = styled(Typography)({
  textAlign: "center",
  marginTop: "15px",
});

export const WrapperInput = styled("div")({
  position: "relative",
});

export const ErrorMessage = styled("p")({
  position: "absolute",
  bottom: "-8px",
  left: "0",
  color: "red",
  fontSize: "14px",
  fontWeight: "300",
});

export default SignIn;
