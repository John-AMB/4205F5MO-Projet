//import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import UserProfile from "./components/userProfile.jsx";
import Inscription from "./components/Inscription.jsx";

function App() {
  return (
    <Routes>
      <Route path="/user/:userId" element={<UserProfile />} />
      {/*Au cas que URL est /user/:userId-> montre UserProfile*/}
      <Route path="/inscription" element={<Inscription />} />
    </Routes>
  );
}

export default App;
