const pool = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// --- INSCRIPTION ---
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // On hache le mot de passe avant de l'enregistrer
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING id, name, email",
            [name, email, hashedPassword]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({ error: "Cet email est déjà utilisé." });
        }
        console.error(error);
        res.status(500).json({ error: "Erreur lors de l'inscription" });
    }
};

// --- CONNEXION ---
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. On cherche l'utilisateur par son email
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        // Si on ne trouve rien
        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Utilisateur non trouvé ou email incorrect." });
        }

        const user = result.rows[0];

        // 2. On compare le mot de passe tapé avec le hash de la table SQL
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Mot de passe incorrect." });
        }

        // 3. Si tout est bon, on crée un Token
        const token = jwt.sign(
            { id: user.id, email: user.email }, 
            "TA_CLE_SECRETE_SUPER_SECURISEE", 
            { expiresIn: "24h" }
        );

        res.json({
            message: "Connexion réussie !",
            token: token,
            user: { id: user.id, name: user.name, email: user.email }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur lors de la connexion" });
    }
};