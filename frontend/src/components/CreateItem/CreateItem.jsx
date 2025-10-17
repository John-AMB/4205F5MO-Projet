import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext/auth-context";
import { useNavigate } from "react-router-dom";
import "./CreateItem.css";

const AddIdea = () => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [message, setMessage] = useState("");

  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_id", 1);
    formData.append("titre", titre);
    formData.append("description", description);
    if (photo) formData.append("photo", photo); // photo is File object from input

    try {
      const res = await fetch("http://localhost:3001/ideas", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Idea added successfully!");
        setTitre("");
        setDescription("");
        setPhoto(null);
      } else {
        setMessage("Error: " + data.error);
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleLogin = () => {
    navigate("/login"); //redirige vers login
  };

  const handleSignup = () => {
    navigate("/inscription"); //redirige vers inscription
  };

  return isLoggedIn ? (
    <div className="add-idea-container">
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
    <div className="add-idea-container">
      <h2>You must be logged in to access this feature</h2>

      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default AddIdea;
