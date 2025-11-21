import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/auth-context";
import "./AdminBoard.css";

const AdminBoard = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    //if not logged in -> redirect to login
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    //if logged in but NOT admin -> redirect to home
    if (user?.role !== "admin") {
      navigate("/");
    }
  }, [isLoggedIn, user, navigate]);

  //if user isn't admin, don't show the page while redirecting
  if (!isLoggedIn || user?.role !== "admin") {
    return null;
  }

  return (
    <div className="profileOptionsPage">
      <div className="profileOptions">
        <h2>Hello, {user?.username || "User"}</h2>
        <p>Admin Actions:</p>

        <div className="optionsList">
          <button className="optionBtn" onClick={() => navigate("/all-users")}>
            See all Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminBoard;
