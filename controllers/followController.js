const pool = require("../models/db");

// suivre un utilisateur
exports.followUser = async (req, res) => {
    try {

        const follower_id = req.user.id;
        const { following_id } = req.body;

        const result = await pool.query(
            "INSERT INTO followers (follower_id, following_id) VALUES ($1,$2) RETURNING *",
            [follower_id, following_id]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        res.status(500).json({ error: "Erreur lors du follow" });
    }
};

// voir les followers
exports.getFollowers = async (req, res) => {

    const { userId } = req.params;

    const result = await pool.query(
        `SELECT users.id, users.name
         FROM followers
         JOIN users ON followers.follower_id = users.id
         WHERE followers.following_id = $1`,
        [userId]
    );

    res.json(result.rows);
};

// voir qui on suit
exports.getFollowing = async (req, res) => {

    const { userId } = req.params;

    const result = await pool.query(
        `SELECT users.id, users.name
         FROM followers
         JOIN users ON followers.following_id = users.id
         WHERE followers.follower_id = $1`,
        [userId]
    );

    res.json(result.rows);
};