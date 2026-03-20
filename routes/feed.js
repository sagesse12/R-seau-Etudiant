// On importe express
const express = require("express");

// On crée un router
const router = express.Router();

// On importe le controller
const feedController = require("../controllers/feedController");

// On importe le middleware de sécurité (token)
const verifyToken = require("../middlewares/authMiddleware");

// Route pour récupérer le feed
router.get("/", verifyToken, feedController.getFeed);

// On exporte la route
module.exports = router;

