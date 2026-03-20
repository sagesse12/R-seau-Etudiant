// On importe la connexion à la base de données PostgreSQL
const pool = require("../models/db");

// Fonction pour récupérer le fil d'actualité
exports.getFeed = async (req, res) => {

    try {

        // req.user.id vient du token JWT
        // Cela permet de savoir quel utilisateur est connecté
        const user_id = req.user.id;

        // Requête SQL pour récupérer les posts
        const result = await pool.query(

            // On récupère les posts + le nom de l'utilisateur
            `SELECT posts.*, users.name,

            // On compte le nombre de likes
            COUNT(likes.id) AS like_count

            FROM posts

            // On relie les posts avec les utilisateurs
            JOIN users ON posts.user_id = users.id

            // On relie les likes aux posts
            LEFT JOIN likes ON likes.post_id = posts.id

            // On groupe les résultats pour compter les likes
            GROUP BY posts.id, users.name

            // Tri intelligent du feed
            ORDER BY

            // Priorité aux personnes que tu suis
            CASE 
                WHEN posts.user_id IN (
                    SELECT following_id
                    FROM followers
                    WHERE follower_id = $1
                )
                THEN 1
                ELSE 2
            END,

            // Ensuite les posts populaires
            like_count DESC,

            // Puis mélange aléatoire
            RANDOM()

            // Limite de 20 posts
            LIMIT 20`,
            [user_id]
        );

        // On renvoie les posts au client
        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Erreur lors du chargement du feed"
        });
    }
};