import { createPortal } from "react-dom";

const UserOptionsPortal = ({ children }) => {
  const portalRoot = document.getElementById("portal-root");
  return createPortal(children, portalRoot);
};

export default UserOptionsPortal;
