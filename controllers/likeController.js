const pool = require("../models/db");

// Ajouter un like
exports.addLike = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { post_id } = req.body;

        const result = await pool.query(
            "INSERT INTO likes (user_id, post_id) VALUES ($1,$2) RETURNING *",
            [user_id, post_id]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors du like" });
    }
};