import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import UserProfile from "../components/userProfile";

function App() {
  const loggedInUserId = 1; // doit changer pour que le const devient de login

  return (
    <div>
      <UserProfile userId={loggedInUserId} />
    </div>
  );
}

export default App;
