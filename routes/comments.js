const pool = require("../models/db");

exports.addComment = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { post_id, comment } = req.body;

        const result = await pool.query(
            "INSERT INTO comments (user_id, post_id, comment) VALUES ($1,$2,$3) RETURNING *",
            [user_id, post_id, comment]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors du commentaire" });
    }
};