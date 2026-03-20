const pool = require("../models/db");

// Récupérer le profil complet d'un utilisateur
exports.getProfile = async (req, res) => {
    try {
        const { userId } = req.params; // ID du profil à consulter

        // 1️⃣ Infos utilisateur
        const userResult = await pool.query(
            "SELECT id, name, email FROM users WHERE id = $1",
            [userId]
        );

        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        const user = userResult.rows[0];

        // 2️⃣ Nombre de followers
        const followersResult = await pool.query(
            "SELECT COUNT(*) FROM followers WHERE following_id = $1",
            [userId]
        );
        const followersCount = parseInt(followersResult.rows[0].count);

        // 3️⃣ Nombre de following
        const followingResult = await pool.query(
            "SELECT COUNT(*) FROM followers WHERE follower_id = $1",
            [userId]
        );
        const followingCount = parseInt(followingResult.rows[0].count);

        // 4️⃣ Posts de l'utilisateur avec nombre de likes
        const postsResult = await pool.query(
            `SELECT posts.*, COUNT(likes.id) AS like_count
             FROM posts
             LEFT JOIN likes ON likes.post_id = posts.id
             WHERE posts.user_id = $1
             GROUP BY posts.id
             ORDER BY posts.created_at DESC`,
            [userId]
        );

        res.json({
            user,
            followers: followersCount,
            following: followingCount,
            posts: postsResult.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération du profil" });
    }
};