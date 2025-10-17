import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/auth-context";
import "./UserButton.css";

const UserButton = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return isLoggedIn ? (
    <div className="userButton">
      <img
        src="/general/noAvatar.png"
        alt="avatar"
        className="profilePic"
        onClick={() => navigate(`/user/${user.id}`)}
      />

      <img
        src="/general/arrow.svg"
        alt="toggle"
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <div className="userOptions">
          <div className="uo" onClick={() => navigate("/logout")}>
            Logout
          </div>
          <div className="uo" onClick={() => navigate("/change-password")}>
            Change Password
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
