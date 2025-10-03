import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/auth-context";
import "./UserButton.css";
const UserButton = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return isLoggedIn ? (
    <div className="userButton">
      <img src="/general/noAvatar.png" alt="avatar" />
      <img
        onClick={() => setOpen((prev) => !prev)}
        src="/general/arrow.svg"
        alt="toggle"
      />
      {open && (
        <div className="userOptions">
          <div className="uo" onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
    </div>
  ) : (
    <>
      <Link to="/inscription" className="loginLink">
        Sign Up
      </Link>

      <Link to="/login" className="loginLink">
        Login
      </Link>
    </>
  );
};
export default UserButton;
