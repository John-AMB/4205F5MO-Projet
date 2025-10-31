import "./ChangeBio.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext/auth-context";
import { useNavigate } from "react-router-dom";

const ChangeBio = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bio, setBio] = useState(user?.bio || ""); //initial bio s'il existe

  const handleChange = (e) => {
    setBio(e.target.value);
  };

  const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backendUrl}/users/change-bio`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id, bio }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Erreur lors de la mise a jour de la bio"
        );
      }

      navigate(`/user/${user.id}`); //redirige vers la page de profil de l'utilisateur
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Erreur lors de la mise a jour de la bio");
    }
  };

  return (
    <div className="change-bio-container">
      <h2>Change Bio</h2>
      <form onSubmit={handleSubmit}>
        <textarea value={bio} onChange={handleChange} rows={4} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ChangeBio;
