import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/auth-context";
import "./ModificationProfile.css";

const ProfileOptions = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="profileOptionsPage">
      {isLoggedIn ? (
        <div className="profileOptions">
          <h2>Hello, {user?.username || "User"}</h2>
          <p>Manage your account below:</p>

          <div className="optionsList">
            <button
              className="optionBtn"
              onClick={() => navigate("/change-bio")}
            >
              Edit Bio
            </button>

            <button
              className="optionBtn"
              onClick={() => navigate("/change-photo")}
            >
              Change Profile Picture
            </button>

            <button
              className="optionBtn"
              onClick={() => navigate("/change-password")}
            >
              Change Password
            </button>

            <button
              className="optionBtn delete"
              onClick={() => navigate("/delete-account")}
            >
              Delete Account
            </button>
          </div>
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
      )}
    </div>
  );
};

export default ProfileOptions;
