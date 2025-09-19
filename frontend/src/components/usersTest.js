import React, { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    //retrouver de la data <-backend
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.username}
            {u.bio}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
