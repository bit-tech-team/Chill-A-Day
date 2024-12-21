import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
    name: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
    name: Yup.string().required(true),
  });
}
