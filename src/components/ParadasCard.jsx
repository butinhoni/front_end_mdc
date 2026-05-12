function StatusCard({ dados }) {
  const statusConfig = {
    Trabalhando: {
      corTexto: "text-green-700",
      corFundo: "bg-green-100",
      icone: "🟢",
    },

    Parada: {
      corTexto: "text-red-700",
      corFundo: "bg-red-100",
      icone: "🔴",
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition w-full">
      <h2 className="text-lg font-semibold mb-5">Status das Linhas</h2>

      <div className="space-y-4">
        {dados.map((linha, index) => {
          const config = statusConfig[linha.status] || {
            corTexto: "text-gray-700",
            corFundo: "bg-gray-100",
            icone: "⚪",
          };

          return (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-xl ${config.corFundo}`}
            >
              <span className="font-medium text-gray-700">{linha.nome}</span>

              <span
                className={`flex items-center gap-2 font-semibold ${config.corTexto}`}
              >
                <span>{config.icone}</span>
                <span>{linha.status}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StatusCard;
