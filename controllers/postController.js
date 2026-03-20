const pool = require("../models/db");

// 1. CRÉER un post
exports.createPost = async (req, res) => {
    try {
        const user_id = req.user.id; // ID récupéré depuis le token
        const { content } = req.body;

        const result = await pool.query(
            "INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING *",
            [user_id, content]
        );
        if (!content || content.trim() === "") {
    return res.status(400).json({ error: "Le contenu est requis" });
        }
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la création du post" });
    }
};

// 2. VOIR les posts d'un utilisateur spécifique
exports.getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params; // On récupère l'ID depuis l'URL
        const result = await pool.query(
            "SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC",
            [userId]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des posts" });
    }
};

// 3. MODIFIER un post
exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const userId = req.user.id;

        const result = await pool.query(
            "UPDATE posts SET content = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
            [content, id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(403).json({ error: "Non autorisé ou post introuvable" });
        }

        res.json({ message: "Post mis à jour !", post: result.rows[0] });

    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la modification" });
    }
};

// 4. SUPPRIMER un post
exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const result = await pool.query(
            "DELETE FROM posts WHERE id = $1 AND user_id = $2 RETURNING *",
            [id, userId]
        );

        if (result.rowCount === 0) {
            return res.status(403).json({ error: "Non autorisé ou post introuvable" });
        }

        res.json({ message: "Post supprimé avec succès !" });

    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression" });
    }
};

// --- Liker un post ---
exports.likePost = async (req, res) => {
    const userId = req.user.id;
    const postId = req.params.postId;

    try {
        await pool.query(
            "INSERT INTO likes(user_id, post_id) VALUES($1, $2) ON CONFLICT DO NOTHING",
            [userId, postId]
        );
        res.json({ message: "Post liké !" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors du like" });
    }
};