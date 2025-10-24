import React, { useState, useContext } from "react";
import "../styles/Login.css";
import { AuthContext } from "./AuthContext/auth-context";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); //pour rediriger user vers leur page

  const handleChange = (e) => {
    //e = input change char
    //Enregistrez les entrees utilisateur dans leur champ input.name respectif et permettez a
    //l'utilisateur de modifier les autres champs input.value sans perdre les valeurs precedemment saisies.
    setFormData({
      ...formData, //La meme que-> username: formData.username, password: formData.password
      [e.target.name]: e.target.value, //e.target.name-> username, password | e.target.value-> le valeur de username,password
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //Le formulaire essaie de recharger la page lorsque la personne le soumet.La méthode preventDefault() empeche cela.

    try {
      const res = await fetch("http://localhost:3001/users/login", {
        //appel POST /users/login route dans
        method: "POST",
        headers: { "Content-Type": "application/json" }, //body sera donc dans le format JSON
        body: JSON.stringify(formData), //body: formData -> transform -> JSON
      });

      //object dans le message de backend
      const data = await res.json();

      // si data.user exists/true
      if (data.user) {
        login(data.user); // isLoggedIn = true, passe les infos utilisateur au context

        navigate(`/user/${data.user.id}`); //redirige vers la page d'utilisateur
      } else {
        alert(data.message || "Erreur de connexion");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la connexion");
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} className="login-form">
        {/*Quand le formulaire est soumis, appeler handleSubmit*/}
        <label>
          Nom d’utilisateur
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Mot de passe
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
