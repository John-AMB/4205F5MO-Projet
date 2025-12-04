import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext/auth-context";
import "../styles/Logout.css";

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleConfirm = () => {
    logout();
    navigate("/"); //redirige vers la page d'accueil
  };

  const handleCancel = () => {
    navigate(-1); //retourne a la page precedente
  };

  return (
    <div className="project-container">
      <h2>Are you sure you want to log out?</h2>
      <button onClick={handleConfirm}>Yes, log out</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default Logout;
