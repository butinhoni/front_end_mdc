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
  const [dadosRt, setDadosRt] = useState(null);
  const [periodo, setPeriodo] = useState(7);
  const backgroundColor = "bg-[#d6ad6b]";
  const dadosFiltrados = dados?.grafico?.slice(-periodo) || [];

  async function carregarDados() {
    try {
      const response = await api.get("/dashboard_rt");
      setDadosRt(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  async function carregarDadosDiarios() {
    try {
      const response = await api.get("/dashboard_diario");
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

  useEffect(() => {
    carregarDadosDiarios();

    const interval = setInterval(() => {
      carregarDadosDiarios();
    }, 7200000);

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
        <StatusCard dados={dadosRt.paradas} />
      </div>
      {/* Cards */}
      <h2 className="text-3xl font-bold mb-6">Resumo do dia {dados.data}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
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
          titulo="R.E.M"
          dados={dados.rem}
          cor="principal"
          unidade=""
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
        <ResumoCard
          titulo="Teor de Ouro"
          dados={dados.teor}
          cor="principal"
          unidade="g/ton"
        />
      </div>
      {/* Gráfico */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setPeriodo(7)}
          className={`px-4 py-2 rounded-lg ${periodo === 7 ? `${backgroundColor} text-white` : "bg-gray-200"}`}
        >
          Semanal
        </button>
        <button
          onClick={() => setPeriodo(30)}
          className={`px-4 py-2 rounded-lg ${periodo === 30 ? `${backgroundColor} text-white` : "bg-gray-200"}`}
        >
          Mensal
        </button>
        <button
          onClick={() => setPeriodo(90)}
          className={`px-4 py-2 rounded-lg ${periodo === 90 ? `${backgroundColor} text-white` : "bg-gray-200"}`}
        >
          Trimestre
        </button>
      </div>
      <h2 className="text-3xl font-bold mb-6">Ultimos {periodo} dias</h2>
      <div className="bg-white p-4 rounded-2xl shadow  mb-8">
        <h2 className="text-lg font-semibold mb-4">Lavra Diária</h2>
        <GraficoBarras dados={dadosFiltrados} />
      </div>
      {/* grafico */}
      <div className="bg-white p-4 rounded-2xl shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Procssamento Diário</h2>
        <GraficoBene dados={dadosFiltrados} />
      </div>
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">Produção Diária</h2>
        <GraficoOuro dados={dadosFiltrados} />
      </div>
    </div>
  );
}

export default App;
