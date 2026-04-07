import { useState } from "react";
import { login } from "./services/api";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);

  const handleLogin = async () => {
    const data = await login(email, password);

    console.log(data);

    if (data.token) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
    } else {
      alert("Erreur de connexion");
    }
  };

  if (token) {
    return <h2>Tu es connecté 🎉</h2>;
  }

  return (
    <div>
      <h1>Login</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
}

export default App;