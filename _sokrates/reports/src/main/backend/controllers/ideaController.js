// ideasController.js
const streamifier = require("streamifier");
const IdeasModel = require("../models/ideaModel");
const cloudinary = require("../cloudinaryConfig");

// Helper: upload image buffer to Cloudinary
const uploadFromBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) resolve(result);
      else reject(error);
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// GET /ideas
const getAllIdeas = async (req, res) => {
  try {
    const ideas = await IdeasModel.getAllIdeas();
    res.json(ideas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /ideas/:id
const getIdeaById = async (req, res) => {
  try {
    const id = req.params.id;
    const idea = await IdeasModel.getIdeaById(id);

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    res.json(idea);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /ideas
const createIdea = async (req, res) => {
  try {
    let photoUrl = null;

    if (req.file) {
      const result = await uploadFromBuffer(req.file.buffer);
      photoUrl = result.secure_url;
    }

    const newIdea = {
      user_id: req.body.user_id,
      titre: req.body.titre,
      description: req.body.description,
      photo: photoUrl,
    };

    const createdIdea = await IdeasModel.createIdea(newIdea);
    res.status(201).json({ message: "Idea created", id: createdIdea.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to create idea" });
  }
};

// PUT /ideas/:id
const updateIdea = async (req, res) => {
  try {
    const id = req.params.id;
    const idea = req.body;

    const updatedIdea = await IdeasModel.updateIdea(id, idea);
    res.json({ message: "Idea updated", idea: updatedIdea });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /ideas/:id
const deleteIdea = async (req, res) => {
  try {
    const id = req.params.id;
    await IdeasModel.deleteIdea(id);
    res.json({ message: "Idea deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllIdeas,
  getIdeaById,
  createIdea,
  updateIdea,
  deleteIdea,
};
