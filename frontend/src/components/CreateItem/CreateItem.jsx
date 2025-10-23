import { useState } from "react";
import "./CreateItem.css";
import { useNavigate } from "react-router-dom";

const AddIdea = () => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState("");
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
        setMessage("❌ Error: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      setMessage("❌ Network or server error: " + err.message);
    }
  };

  return (
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
  );
};

export default AddIdea;
