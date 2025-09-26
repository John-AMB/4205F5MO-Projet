import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/UserProfile.css";

function UserProfile() {
  const { userId } = useParams(); // prend le userId <- URL: <Route path="/user/:userId" element={<UserProfile />}
  const [user, setUser] = useState(null);

  useEffect(() => {
    //fonctionne apres useState
    if (!userId) return; //lorsque userId retourne null, renvoi null

    fetch(`http://localhost:3001/users/${userId}`) //prend les info de user avec userId
      .then((res) => res.json())
      .then((data) => setUser(data)); //stocke les info de user dans le db dans const user
  }, [userId]); //si userId change -> useEffect est appele encore

  if (!user) return <p>Loading...</p>;

  return (
    <div className="user-profile-container">
      {/* espace reserve pr photo dans le futur) */}
      <div className="user-profile-left">
        <div className="user-profile-pic">Photo</div>
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
