import { useState } from "react";

import { BasicModal } from "../Modal";

import useAuth from "../../hooks/useAuth";

import "./about.scss";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import { Icon } from "semantic-ui-react";

export const About = () => {
  const { closeSession } = useAuth();

  return (
    <>
      <div className="container-about">
        <div className="container-about__content">
          <div className="container-about__content__privacity">
            {/* <span>
              <ThemeSwitcher />
            </span> */}
            <span>
              <button onClick={closeSession}>
                <Icon name="log out" />
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
