import "./ChangePassword.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext/auth-context";

const ChangePassword = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    //e = input change char
    //Enregistrez les entrees utilisateur dans leur champ input.name respectif et permettez a
    //l'utilisateur de modifier les autres champs input.value sans perdre les valeurs precedemment saisies.
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //Le formulaire essaie de recharger la page lorsque la personne le soumet.La méthode preventDefault() empeche cela.

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch(`${backendUrl}/users/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, //body sera donc dans le format JSON
        body: JSON.stringify({
          userId: user.id, //stocke dans le context
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      });

      //object dans le message de backend
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error updating password");
      }

      alert("Password updated successfully!");
      navigate(`/user/${user.id}`);
    } catch (err) {
      console.error(err);
      alert(err.message || "Server error");
    }
  };

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Current Password
          <input
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          New Password
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Confirm New Password
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
