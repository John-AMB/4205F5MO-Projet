//definit les chemins d'accas URL et les relie aux controleurs
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET /users
router.get("/", userController.getUsers);

// GET /users/:id
router.get("/:id", userController.getUser);

// POST /users
router.post("/", userController.createUser);

module.exports = router;
