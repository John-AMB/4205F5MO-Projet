import "./ChangeBio.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext/auth-context";
import { useNavigate } from "react-router-dom";

const ChangeBio = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bio, setBio] = useState("");
  const handleChange = (e) => {
    setBio(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/users/change-bio`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id, bio }),
      });
      if (response.ok) {
        navigate(`/user/${user.id}`);
      } else {
        console.error("Failed to update bio");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="change-bio-container">
      <h2>Change Bio</h2>
      <form onSubmit={handleSubmit}>
        <textarea value={bio} onChange={handleChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ChangeBio;
