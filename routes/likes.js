const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController");
const verifyToken = require("../middlewares/authMiddleware");

router.post("/", verifyToken, likeController.addLike);

module.exports = router;