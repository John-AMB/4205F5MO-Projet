import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/auth-context";
import "./UserButton.css";

const UserButton = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  //
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      //si le dropdown existe et que le clic n'est pas a l'interieur, on ferme le menu
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return isLoggedIn ? (
    <div className="userButton" ref={menuRef}>
      <img
        src={user.photo ? user.photo : "/general/noAvatar.png"}
        alt="avatar"
        className="profilePic"
        onClick={() => {
          navigate(`/user/${user.id}`);
          setOpen(false);
        }}
      />
      <img
        src="/general/arrow.svg"
        alt="toggle"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="userOptions">
          <div
            className="uo"
            onClick={() => {
              navigate(`/user/${user.id}`);
              setOpen(false);
            }}
          >
            Profile
          </div>
          <div
            className="uo"
            onClick={() => {
              navigate("/modification");
              setOpen(false);
            }}
          >
            Options
          </div>
          {/*ADMIN*/}
          {user.role === "admin" && (
            <div
              className="uo admin-link"
              onClick={() => {
                navigate("/AdminBoard");
                setOpen(false);
              }}
            >
              Admin Board
            </div>
          )}
          <div
            className="uo"
            onClick={() => {
              navigate("/logout");
              setOpen(false);
            }}
          >
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
