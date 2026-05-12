import { useEffect, useState } from "react";

import api from "./services/api";
import ResumoCard from "./components/ResumoCard";
import GraficoBarras from "./components/GraficoBarras";
import GraficoBene from "./components/GraficoBene";
import StatusCard from "./components/ParadasCard";
import GraficoOuro from "./components/GraficoOuro";
import Login from "./components/Login";

function App() {
  const [logado, setLogado] = useState(
    localStorage.getItem("logado") === "true",
  );
  const [dados, setDados] = useState(null);

  async function carregarDados() {
    try {
      const response = await api.get("/dashboard");
      setDados(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  function logout() {
    localStorage.removeItem("logado");
    setLogado(false);
  }

  useEffect(() => {
    carregarDados();

    const interval = setInterval(() => {
      carregarDados();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!dados) {
    return <p>Carregando...</p>;
  }

  if (!logado) {
    return <Login onLogin={() => setLogado(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <img src="/logo_claro.png" alt="logo" className="w-80 mb-6" />
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Sair
        </button>
      </div>
      <h2 className="text-3xl font-bold mb-6">Status da Planta</h2>
      <div className="mb-8">
        <StatusCard dados={dados.paradas} />
      </div>
      {/* Cards */}
      <h2 className="text-3xl font-bold mb-6">Resumo do dia {dados.data}</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <ResumoCard
          titulo="Minério"
          dados={dados.minerio}
          cor="principal"
          unidade="ton"
        />
        <ResumoCard
          titulo="Estéril"
          dados={dados.esteril}
          cor="principal"
          unidade="ton"
        />
        <ResumoCard
          titulo="Processado"
          dados={dados.processado}
          cor="principal"
          unidade="ton"
        />
        <ResumoCard
          titulo="Ouro Produzido"
          dados={dados.producao}
          cor="principal"
          unidade="g"
        />
      </div>
      {/* Gráfico */}
      <h2 className="text-3xl font-bold mb-6">Resumo mensal</h2>
      <div className="bg-white p-4 rounded-2xl shadow  mb-8">
        <h2 className="text-lg font-semibold mb-4">Lavra Diária</h2>
        <GraficoBarras dados={dados.grafico} />
      </div>
      {/* grafico */}
      <div className="bg-white p-4 rounded-2xl shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Procssamento Diário</h2>
        <GraficoBene dados={dados.grafico} />
      </div>
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">Produção Diária</h2>
        <GraficoOuro dados={dados.grafico} />
      </div>
    </div>
  );
}

export default App;
