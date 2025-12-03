import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext/auth-context";
import { useNavigate } from "react-router-dom";
import "./CreateItem.css";
import "../../styles/global.css";
const AddIdea = () => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState("");

  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Uploading...");

    const formData = new FormData();
    formData.append("user_id", 1);
    formData.append("titre", titre);
    formData.append("description", description);
    if (photo) formData.append("photo", photo);

    const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

    try {
      const res = await fetch(`${backendUrl}/ideas`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Idea added successfully!");
        setTitre("");
        setDescription("");
        setPhoto(null);
        setTimeout(() => navigate("/"), 500);
      } else {
        setMessage(" Error: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      setMessage(" Network or server error: " + err.message);
    }
  };

  const handleLogin = () => {
    navigate("/login"); //redirige vers login
  };

  const handleSignup = () => {
    navigate("/inscription"); //redirige vers inscription
  };

  return isLoggedIn ? (
    <div className="project-container">
      <h2>Add a New Idea</h2>
      <form className="add-idea-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <button type="submit">➕ Add Idea</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  ) : (
    <div className="project-container">
      <h2>You must be logged in to access this feature</h2>

      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default AddIdea;
