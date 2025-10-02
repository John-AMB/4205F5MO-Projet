// ideasRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const ideasController = require("../controllers/ideaController");

const storage = multer.memoryStorage();
const upload = multer({ storage });
// GET all ideas
router.get("/", ideasController.getAllIdeas);

// GET one idea
router.get("/:id", ideasController.getIdeaById);

// POST new idea
router.post("/", upload.single("photo"), ideasController.createIdea);

// PUT update idea
router.put("/:id", ideasController.updateIdea);

// DELETE idea
router.delete("/:id", ideasController.deleteIdea);

module.exports = router;
