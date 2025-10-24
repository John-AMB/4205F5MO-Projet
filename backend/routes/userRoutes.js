//definit les chemins d'accas URL et les relie aux controleurs
const express = require("express");
const router = express.Router();
const multer = require("multer");
const userController = require("../controllers/userController");

const storage = multer.memoryStorage();
const upload = multer({ storage });

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

// PUT /users/change-photo
router.put(
  "/change-photo",
  upload.single("photo"),
  userController.changeProfilePhoto
);

module.exports = router;
