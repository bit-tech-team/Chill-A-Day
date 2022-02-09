import React from "react";
import "./Footer.scss";

export default function Footer() {
  return (
    <div className="container-footer">
      <div className="container-footer__content">
        <span>
          code and illustrations by me:{" "}
          <a href="https://shakarr.github.io">shakar</a>, sound design with{" "}
          <a href="https://raining.fm/">raining.fm</a> and font designed by{" "}
          <a href="https://jitkajaneckova.com/">Jitka Janečková</a>
        </span>
      </div>
    </div>
  );
}
