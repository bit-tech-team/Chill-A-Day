import React, { useState } from "react";
import { Form, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

import { PrimaryButton } from "../PrimaryButton";

import { initialValues, validationSchema } from "./RegisterForm.data";
import { BackendClient } from "../../utils/backendClient";

import "./registerForm.scss";

export const RegisterForm = (props) => {
  const { openLogin, goBack } = props;

  const client = new BackendClient();
  const [showPassword, setShowPassword] = useState(false);

  const onShowHidenPassword = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { data } = await client.post("/api/users", formValue);
        console.log(data);
        
        toast.success(data.msg);
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          const { msg } = error.response.data;
          toast.error(msg);
        } else {
          toast.error("Ha ocurrido un error inesperado");
        }
      }
    },
  });

  return (
    <div className="register-form">
      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          name="name"
          type="text"
          placeholder="¿Como deberíamos llamarte?"
          icon="user circle outline"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />
        <Form.Input
          name="email"
          type="text"
          placeholder="Correo electronico"
          icon="mail outline"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          icon={
            <Icon
              name={showPassword ? "eye slash" : "eye"}
              link
              onClick={onShowHidenPassword}
            />
          }
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
        />

        <div className="w-full flex justify-center">
          <PrimaryButton type="submit" text="Registrarse"></PrimaryButton>
        </div>
      </Form>

      <div className="register-form__options">
        <p onClick={goBack}>Volver</p>
        <p>
          ¿Ya tienes cuenta? <span onClick={openLogin}>Iniciar sesión</span>
        </p>
      </div>
    </div>
  );
};
