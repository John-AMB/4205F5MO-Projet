import "./ChangePhoto.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext/auth-context";
import { Link, useNavigate } from "react-router-dom";

const ChangePhoto = () => {
  const { isLoggedIn, user, updateUser } = useContext(AuthContext);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

  const handleFileChange = (e) => {
    const file = e.target.files[0]; //get le premier fichier
    if (file) {
      setPhoto(file); //stocke le fichier
      setPreview(URL.createObjectURL(file)); //cree une URL temporaire pour preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      setMessage("Please select a photo first.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("photo", photo);

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${backendUrl}/users/change-photo`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update photo.");
      }

      updateUser({ photo: data.photo || preview }); //met a jour le context avec la nouvelle photo

      setMessage("Profile photo updated successfully!");
      setTimeout(() => navigate(`/user/${user.id}`), 1500);
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.message || "Failed to upload photo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <Link to="/inscription" className="loginLink">
          Sign Up
        </Link>
        <Link to="/login" className="loginLink">
          Login
        </Link>
      </>
    );
  }

  return (
    <div className="project-container">
      <h2>Change Profile Picture</h2>
      <form onSubmit={handleSubmit} className="change-photo-form">
        {preview ? (
          <img src={preview} alt="Preview" className="photo-preview" />
        ) : (
          <img
            src={user.photo || "/general/noAvatar.png"}
            alt="Current"
            className="photo-preview"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
        />
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ChangePhoto;
