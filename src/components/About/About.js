import React, { useState } from "react";
import Modal from "../Modal/Modal";
import "./About.scss";

export default function About(props) {
  const [show, setShow] = useState(null);

  return (
    <>
      <div className="container-about">
        <div className="container-about__content">
          <div className="container-about__content__privacity">
            <span>
              <a href="http://github.com">about / privacy</a>
            </span>
          </div>

          <div className="container-about__content__theme">
            <div className="container-about__content__theme__text">
              <span>Dark Mode </span>
            </div>

            <div className="container-about__content__theme__button">
              <input id="darkMode" type="checkbox" />
            </div>
          </div>
        </div>
        <Modal show={show} setShow={setShow}>
          <p>Modal</p>
          <button onClick={() => setShow(false)}>open modal</button>
        </Modal>
      </div>
    </>
  );
}
