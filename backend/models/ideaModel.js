// ideasModel.js
const db = require("../db"); // import de db.js pour la connexion à MySQL

// Récupérer toutes les idées
const getAllIdeas = (callback) => {
  db.query("SELECT * FROM idees", callback);
};

// Récupérer une idée par ID
const getIdeaById = (id, callback) => {
  db.query("SELECT * FROM idees WHERE id = ?", [id], callback);
};

// Créer une nouvelle idée
const createIdea = (idea, callback) => {
  db.query(
    "INSERT INTO idees (user_id, titre, description, photo, date) VALUES (?, ?, ?, ?, ?)",
    [idea.user_id, idea.titre, idea.description, idea.photo, idea.date],
    callback
  );
};

// Mettre à jour une idée
const updateIdea = (id, idea, callback) => {
  db.query(
    "UPDATE idees SET titre = ?, description = ?, photo = ?, date = ? WHERE id = ?",
    [idea.titre, idea.description, idea.photo, idea.date, id],
    callback
  );
};

// Supprimer une idée
const deleteIdea = (id, callback) => {
  db.query("DELETE FROM idees WHERE id = ?", [id], callback);
};

module.exports = {
  getAllIdeas,
  getIdeaById,
  createIdea,
  updateIdea,
  deleteIdea,
};
