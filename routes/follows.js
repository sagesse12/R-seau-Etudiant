const express = require("express");
const router = express.Router();
const followController = require("../controllers/followController");
const verifyToken = require("../middlewares/authMiddleware");

// suivre quelqu’un
router.post("/", verifyToken, followController.followUser);

// voir les followers
router.get("/followers/:userId", verifyToken, followController.getFollowers);

// voir qui on suit
router.get("/following/:userId", verifyToken, followController.getFollowing);

module.exports = router;