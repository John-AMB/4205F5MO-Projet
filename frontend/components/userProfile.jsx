import React, { useEffect, useState } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    //fonctionne apres useState
    if (!userId) return; //lorsque userId retourne null, renvoi null

    fetch(`http://localhost:3001/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data)); //stocke les info de user dans le db dans const user
  }, [userId]); //si userId change -> useEffect est appele encore

  if (!user) return <p>user = null</p>;

  return (
    <div>
      <h1>{user.username}</h1>
      <p>{user.bio}</p>
    </div>
  );
}

export default UserProfile;
