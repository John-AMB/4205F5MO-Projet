// ideasController.js
const IdeasModel = require("../models/ideaModel");

// GET /ideas
const getAllIdeas = (req, res) => {
  IdeasModel.getAllIdeas((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// GET /ideas/:id
const getIdeaById = (req, res) => {
  const id = req.params.id;
  IdeasModel.getIdeaById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(404).json({ message: "Idea not found" });
    res.json(results[0]);
  });
};

// POST /ideas
const createIdea = (req, res) => {
  const newIdea = req.body;
  IdeasModel.createIdea(newIdea, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Idea created", id: results.insertId });
  });
};

// PUT /ideas/:id
const updateIdea = (req, res) => {
  const id = req.params.id;
  const idea = req.body;
  IdeasModel.updateIdea(id, idea, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Idea updated" });
  });
};

// DELETE /ideas/:id
const deleteIdea = (req, res) => {
  const id = req.params.id;
  IdeasModel.deleteIdea(id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Idea deleted" });
  });
};

module.exports = {
  getAllIdeas,
  getIdeaById,
  createIdea,
  updateIdea,
  deleteIdea,
};
