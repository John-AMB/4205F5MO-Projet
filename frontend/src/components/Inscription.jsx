import React, { useState } from "react";
import "../styles/Inscription.css";
import { useNavigate } from "react-router-dom";

function Inscription() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    bio: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    //e = input change char
    //Enregistrez les entrees utilisateur dans leur champ input.name respectif et permettez a
    //l'utilisateur de modifier les autres champs input.value sans perdre les valeurs precedemment saisies.
    setFormData({
      ...formData, //La meme que-> username: formData.username, password: formData.password, bio: formData.bio
      [e.target.name]: e.target.value, //e.target.name-> username, password,bio | e.target.value-> le valeur de username,password,bio
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //Le formulaire essaie de recharger la page lorsque la personne le soumet.La méthode preventDefault() empeche cela.

    fetch("http://localhost:3001/users", {
      //appel POST /users route dans
      method: "POST",
      headers: { "Content-Type": "application/json" }, //body sera donc dans le format JSON
      body: JSON.stringify(formData), //body: formData -> transform -> JSON
    })
      .then((res) => res.json()) //message de backend, s'il y a d'erreur ou succes
      .then((data) => {
        //object dans le message de backend
        console.log("Utilisateur créé:", data);
        alert("Compte créé avec succès !");

        navigate(`/login`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="inscription-container">
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit} className="inscription-form">
        <label>
          Nom d’utilisateur
          <input
            type="text"
            name="username"
            value={formData.username} //ce qu'on retrouve -> username
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Mot de passe
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

        <button type="submit">S’inscrire</button>
      </form>
    </div>
  );
}

export default Inscription;
