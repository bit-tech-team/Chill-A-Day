import useAuth from "../../hooks/useAuth";
import { Buy } from "../Buy";

import "./footer.scss";

export const Footer = () => {
  const {isPremium} = useAuth()

  return (
    <div className="container-footer">
      <div className="container-footer__content">
        {!isPremium && <Buy />}
      </div>
    </div>
  );
};
