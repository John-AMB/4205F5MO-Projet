import React, { useState } from "react";
import "../styles/Inscription.css";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

function Inscription() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    bio: "",
  });
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

  const handleChange = (e) => {
    //e = input change char
    //Enregistrez les entrees utilisateur dans leur champ input.name respectif et permettez a
    //l'utilisateur de modifier les autres champs input.value sans perdre les valeurs precedemment saisies.
    setFormData({
      ...formData, //La meme que-> username: formData.username, password: formData.password, bio: formData.bio
      [e.target.name]: e.target.value, //e.target.name-> username, password,bio | e.target.value-> le valeur de username,password,bio
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //Le formulaire essaie de recharger la page lorsque la personne le soumet.La méthode preventDefault() empeche cela.

    try {
      const res = await fetch(`${backendUrl}/users`, {
        //appel POST /users route dans
        method: "POST",
        headers: { "Content-Type": "application/json" }, //body sera donc dans le format JSON
        body: JSON.stringify(formData), //body: formData -> transform -> JSON
      });

      const data = await res.json();

      if (!res.ok) {
        //erreur 4xx ou 5xx a
        throw new Error(data.message || "Erreur lors de la création du compte");
      }
      alert("Compte créé avec succès !");

      navigate("/login");
    } catch (err) {
      console.error("Erreur lors de la création du compte:", err);
      alert(err.message || "Erreur lors de la création du compte");
    }
  };

  return (
    <div className="project-container">
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit} className="inscription-form">
        <label>
          Username
          <input
            type="text"
            name="username"
            value={formData.username} //ce qu'on retrouve -> username
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={formData.password} //ce qu'on retrouve -> password
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Bio
          <textarea
            name="bio"
            value={formData.bio} //ce qu'on retrouve -> bio
            onChange={handleChange}
            rows="3"
          />
        </label>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Inscription;
