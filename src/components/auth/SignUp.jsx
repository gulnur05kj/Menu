import styled from "@emotion/styled";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { validationSignUp } from "../../utils/constants/validation";
import {
  ErrorMessage,
  StyledLink,
  StyledTypography,
  WrapperInput,
} from "./Signin";
import { useDispatch, useSelector } from "react-redux";
import { signUpThunk } from "../../redux/slices/authSlices";

export const SignUp = () => {
  const dispatch = useDispatch();
  const { isLoading, errorMessage } = useSelector((state) => state.menu);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validationSchema: validationSignUp,
    onSubmit: (values, { resetForm }) => {
      const newData = {
        ...values,
        role:
          values.email === "admin@gmail.com" && values.password === "Admin123"
            ? "ADMIN"
            : "USER",
      };

      dispatch(signUpThunk(newData));
      resetForm();
    },
  });

  return (
    <Paper
      elevation={3}
      sx={{ width: "400px", padding: "20px", margin: "100px auto" }}
    >
      <Typography variant="h5">Регистрация</Typography>
      <form onSubmit={formik.handleSubmit}>
        <WrapperInput>
          <StyledInput
            name="name"
            label="Имя"
            fullWidth
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name && (
            <ErrorMessage>{formik.errors.name}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <StyledInput
            label="Почта"
            fullWidth
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email && (
            <ErrorMessage>{formik.errors.email}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <StyledInput
            name="password"
            label="Пароль"
            fullWidth
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password && (
            <ErrorMessage>{formik.errors.password}</ErrorMessage>
          )}
        </WrapperInput>

        {errorMessage && (
          <Typography color="error" textAlign="center">
            {errorMessage}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: "13px" }}
          disabled={isLoading}
        >
          {isLoading ? "Загрузка..." : "Зарегистрироваться"}
        </Button>

        <StyledTypography>
          <StyledLink to="/sign-in">Войти в аккаунт</StyledLink>
        </StyledTypography>
      </form>
    </Paper>
  );
};

const StyledInput = styled(TextField)({
  margin: "10px auto",
});
