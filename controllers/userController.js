const pool = require("../models/db");

// Rechercher un utilisateur par nom ou email
exports.searchUsers = async (req, res) => {
    try {

        // On récupère le mot recherché dans l'URL
        const { query } = req.query;

        // Requête SQL pour chercher dans name ou email
        const result = await pool.query(
            `SELECT id, name, email
             FROM users
             WHERE name ILIKE $1 OR email ILIKE $1`,
            [`%${query}%`]
        );

        // On retourne les utilisateurs trouvés
        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la recherche" });
    }
};