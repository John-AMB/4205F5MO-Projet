import { createPortal } from "react-dom";

const EditIdeaPortal = ({ children }) => {
  const portalRoot = document.getElementById("portal-root");

  if (!portalRoot) {
    console.error(" No portal-root element found in index.html");
    return null;
  }

  return createPortal(children, portalRoot);
};

export default EditIdeaPortal;
