import React from "react";

import { PrimaryButton } from "../PrimaryButton";

import "./authOptions.scss";

export const AuthOptions = (props) => {
  const { openLogin, openRegister } = props;

  return (
    <div className="auth-options flex flex-column">
      <PrimaryButton
        action={openRegister}
        text="Registrate gratis"
      ></PrimaryButton>

      <PrimaryButton action={openLogin} text="Inicia sesión"></PrimaryButton>
    </div>
  );
};
