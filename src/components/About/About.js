import React, { useState } from "react";
import BasicModal from "../Modal/BasicModal";
import "./About.scss";

export default function About() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);

  function ContentAboutPrivacity() {
    return (
      <div>
        <div className="container-about-modal">
          <h1 className="title-def">about</h1>
          <p className="paragraph-def">
            People are more productive in places they're comfortable in, says a
            study that we made up for the purpose of writing this sentence. That
            said, real experts with real studies recommend you stay away from
            public spaces, so we made a stand-in to be chill studying or
            doing some other activity that requires your concentration, then
            this is your app
          </p>
        </div>
        <div className="container-privacy-modal">
          <h1 className="title-def">privacy</h1>
          <p className="paragraph-def">
            We added Google Analytics to the site! They use cookies to tell us
            about user activity so we can keep improving the app. We don't pass
            any personally identifiable data, and we don't use it for
            advertising. You can learn more about how Google collects data in
            <a href="https://policies.google.com/technologies/partner-sites">
              {" "}
              their privacy policy
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  const onShowModal = () => {
    setTitleModal("About / Privacy");
    setContentModal(<ContentAboutPrivacity />);
    setShowModal(true);
  };

  return (
    <>
      <div className="container-about">
        <div className="container-about__content">
          <div className="container-about__content__privacity">
            <span>
              <button onClick={() => onShowModal()}>about / privacy</button>
            </span>
          </div>
        </div>
        <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
          {contentModal}
        </BasicModal>
      </div>
    </>
  );
}
