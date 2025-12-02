import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/UserProfile.css";

function UserProfile() {
  const { userId } = useParams(); // prend le userId <- URL: <Route path="/user/:userId" element={<UserProfile />}
  const [user, setUser] = useState(null);

  const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

  useEffect(() => {
    //fonctionne apres useState
    if (!userId) return; //lorsque userId retourne null, renvoi null

    const fetchUser = async () => {
      try {
        const response = await fetch(`${backendUrl}/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [userId, backendUrl]); //si userId change -> useEffect est appele encore

  if (!user) return <p>Loading...</p>;

  const profilePhoto = user.photo || "/general/noAvatar.png"; // fallback to default

  return (
    <div className="user-profile-container">
      {/* espace reserve pr photo dans le futur) */}
      <div className="user-profile-left">
        <img
          src={profilePhoto}
          className="user-profile-pic"
          alt={`${user.username}'s profile`}
        />
      </div>

      {/* username + bio */}
      <div className="user-profile-right">
        <div className="user-profile-username">
          <h2>{user.username}</h2>
        </div>
        <div className="user-profile-bio">
          <p>{user.bio}</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
