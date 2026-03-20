const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const verifyToken = require("../middlewares/authMiddlewares");

// Créer un post (protection JWT)
router.post("/", verifyToken, postController.createPost);

// Voir les posts d'un utilisateur
router.get("/user/:userId", verifyToken, postController.getUserPosts);

// Modifier un post
router.put("/:id", verifyToken, postController.updatePost);

// Supprimer un post
router.delete("/:id", verifyToken, postController.deletePost);

module.exports = router;