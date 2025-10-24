import "./ChangePhoto.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext/auth-context";
import { Link, useNavigate } from "react-router-dom";

const ChangePhoto = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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

    try {
      const response = await fetch("http://localhost:3001/users/change-photo", {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Profile photo updated successfully!");
        setTimeout(() => navigate(`/user/${user.id}`), 1500);
      } else {
        setMessage(`Error: ${data.error || "Failed to update photo."}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to upload photo. Please try again.");
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
    <div className="change-photo-container">
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
        <button type="submit" className="submit-btn">
          Upload
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ChangePhoto;
