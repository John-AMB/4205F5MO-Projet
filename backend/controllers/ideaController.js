// ideasController.js
const streamifier = require("streamifier");
const IdeasModel = require("../models/ideaModel");
const cloudinary = require("../cloudinaryConfig");
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
g;
const uploadFromBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) resolve(result);
      else reject(error);
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
};
// POST /ideas
const createIdea = async (req, res) => {
  try {
    let photoUrl = null;

    // If the user uploaded an image
    if (req.file) {
      const result = await uploadFromBuffer(req.file.buffer);
      photoUrl = result.secure_url;
    }

    const newIdea = {
      user_id: req.body.user_id,
      titre: req.body.titre,
      description: req.body.description,
      photo: photoUrl, // this will always be a proper URL or null
    };

    IdeasModel.createIdea(newIdea, (err, data) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: "Idea created", id: data.insertId });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload image" });
  }
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
