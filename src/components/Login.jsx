import { useState } from "react";
import api from "../services/api";

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  localStorage.setItem("logado", "true");

  async function fazerLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("/login", {
        usuario,
        senha,
      });

      if (response.data.sucesso) {
        onLogin();
      }
    } catch {
      setErro("Usuário ou senha inválidos");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={fazerLogin}
        className="bg-white p-8 rounded-2xl shadow w-96"
      >
        <img
          src="/logo_claro.png"
          alt="mdc-mineracação"
          className="w-60 mx-auto mb-6"
        />
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <input
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        {erro && <p className="text-red-500 text-sm mb-4">{erro}</p>}

        <button className="w-full bg-[#d6ad6b] text-white p-3 rounded-lg hover:bg-[#885f3f] transition">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
