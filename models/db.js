const { Pool } = require("pg"); // Note le P majuscule ici

const pool = new Pool({ // On crée "pool" (minuscule) à partir de "Pool" (majuscule)
  user: "postgres",
  host: "localhost",
  database: "mini_reseau",
  password: "postgres", // Vérifie que c'est bien ton mot de passe
  port: 5432,
});

module.exports = pool;