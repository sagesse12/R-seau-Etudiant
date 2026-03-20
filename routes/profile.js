const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const verifyToken = require("../middlewares/authMiddleware");

// Récupérer le profil complet d'un utilisateur
router.get("/:userId", verifyToken, profileController.getProfile);

module.exports = router;