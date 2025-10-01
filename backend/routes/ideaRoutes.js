// ideasRoutes.js
const express = require("express");
const router = express.Router();
const ideasController = require("../controllers/ideaController");

// GET all ideas
router.get("/", ideasController.getAllIdeas);

// GET one idea
router.get("/:id", ideasController.getIdeaById);

// POST new idea
router.post("/", ideasController.createIdea);

// PUT update idea
router.put("/:id", ideasController.updateIdea);

// DELETE idea
router.delete("/:id", ideasController.deleteIdea);

module.exports = router;
