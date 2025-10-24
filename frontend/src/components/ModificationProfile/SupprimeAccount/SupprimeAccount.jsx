import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext/auth-context";
import "./SupprimeAccount.css";

const DeleteAccount = () => {
  const { user, logout } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [confirmUsername, setConfirmUsername] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleDelete = async () => {
    setError("");
    setMessage("");

    //confirme que tous les champs sont remplis
    if (!username || !confirmUsername) {
      return setError("Veuillez remplir tous les champs.");
    }

    //disable le bouton pendant le processus de suppression
    setLoading(true);

    //envoie la requete de suppression au backend
    try {
      const res = await fetch("http://localhost:3001/users/delete-account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          username,
          confirmUsername,
        }),
      });

      //attend la reponse du backend
      const data = await res.json();

      //handle la reponse
      if (data.success) {
        setMessage("Compte supprimé avec succès.");
        logout(); // logout l'utilisateur apres la suppression -> authcontext = false
        setTimeout(() => navigate("/"), 1500);
      } else {
        setError(data.message || "Une erreur est survenue.");
      }
    } catch (err) {
      setError("Erreur du serveur : " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="deleteAccount">
      <h2>Delete your account</h2>
      <p>
        To confirm deletion, please enter your username twice. This action is{" "}
        <strong>irreversible</strong>.
      </p>

      <div className="inputGroup">
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="inputGroup">
        <label>Confirm Username</label>
        <input
          type="text"
          placeholder="Confirm your username"
          value={confirmUsername}
          onChange={(e) => setConfirmUsername(e.target.value)}
        />
      </div>

      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}

      {/* bouton de suppression disabled lorsque loading = true*/}
      <button className="deleteBtn" onClick={handleDelete} disabled={loading}>
        {loading ? "Suppression..." : "Delete my account"}
      </button>

      {/* retour a la page des options*/}
      <button className="cancelBtn" onClick={() => navigate(-1)}>
        Cancel
      </button>
    </div>
  );
};

export default DeleteAccount;
