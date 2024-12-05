import * as Yup from "yup";

const EMAIL_REGX =
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const validationSignIn = Yup.object({
  email: Yup.string()
    .email("почта введен некорректно")
    .matches(EMAIL_REGX, {
      message: "почта некорректен",
    })
    .required("Объязательное поле"),

  password: Yup.string()
    .required("Объязательное поле")
    .matches(passwordRules, "Пароль должен содержать 6 символов"),
});

export const validationSignUp = Yup.object({
  name: Yup.string()
    .min(3, "Имя должен содержать не менее 3 символов")
    .max(15)
    .required("Объязательное поле"),
  email: Yup.string()
    .email("почта введен некорректно")
    .matches(EMAIL_REGX, {
      message: "почта некорректен",
    })
    .required("Объязательное поле"),
  password: Yup.string()
    .required("Объязательное поле")
    .matches(passwordRules, "Пароль должен содержать 6 символов"),
});
