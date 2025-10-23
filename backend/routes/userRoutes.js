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

// POST /users/login
router.post("/login", userController.loginUser);

// POST /users/change-password
router.post("/change-password", userController.changePassword);

// PUT /users/change-bio
router.put("/change-bio", userController.changeBio);

module.exports = router;
