const express = require("express");
const app = express();
const authRoutes = require("./routes/auth"); 
const postRoutes = require("./routes/posts");
const likeRoutes = require("./routes/likes")
const commentRoutes = require("./routes/comments");
const userRoutes = require("./routes/users");
const followRoutes = require("./routes/follows");
const feedRoutes = require("./routes/feed");
const profileRoutes = require("./routes/profile");


app.use("/profile", profileRoutes);
app.use("/feed", feedRoutes);
app.use("/follows", followRoutes);
app.use("/users", userRoutes);
app.use(express.json());
app.use("/auth", authRoutes); 
app.use("/like", likeRoutes);
app.use("/comments", commentRoutes);
app.use(express.json());
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
    res.send("API Mini Réseau Étudiant");
});

app.listen(3000, () => {
    console.log("Serveur lancé sur port 3000");
});
app.use("/posts", postRoutes);
