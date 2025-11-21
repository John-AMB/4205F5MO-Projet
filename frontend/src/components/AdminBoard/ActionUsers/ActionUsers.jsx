import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext/auth-context";
import "./ActionUsers.css";

function ActionUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

  // 🟥 SECURITY CHECK: Only admin can access
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (user.role !== "admin") {
      navigate(`/user/${user.id}`);
      return;
    }
  }, [isLoggedIn, user, navigate]);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${backendUrl}/users`);

        if (!res.ok)
          throw new Error("Erreur lors du chargement des utilisateurs");

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="loading">Getting users..</p>;

  return (
    <div className="users-container">
      <h2 className="title">User list</h2>

      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Photo</th>
            <th>Username</th>
            <th>Role</th>
            <th>Bio</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>

              <td>
                <img
                  src={u.photo || "/general/noAvatar.png"}
                  alt="profil"
                  className="user-photo"
                />
              </td>

              <td>
                <Link to={`/user/${u.id}`} className="user-link">
                  {u.username}
                </Link>
              </td>

              <td>
                <span
                  className={u.role === "admin" ? "badge-admin" : "badge-user"}
                >
                  {u.role}
                </span>
              </td>

              <td>{u.bio || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActionUsers;
