const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // format "Bearer TOKEN"

  if (!token) return res.status(401).json({ error: "Token manquant" });

  jwt.verify(token, "TA_CLE_SECRETE_SUPER_SECURISEE", (err, user) => {
    if (err) return res.status(403).json({ error: "Token invalide" });
    req.user = user; // contient id et email
    next();
  });
};

module.exports = verifyToken;