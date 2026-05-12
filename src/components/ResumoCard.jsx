function ResumoCard({ titulo, dados, cor, unidade }) {
  const cores = {
    blue: "text-blue-600",
    green: "text-green-600",
    principal: "text-[#885f3f]",
    secundaria: "text-[#d6ad6b]",
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">{titulo}</h2>

      <div className="space-y-2">
        <p>
          <span className="text-gray-500">Dia:</span>{" "}
          <span className={`font-bold ${cores[cor]}`}>{dados.dia}</span>
          <span className="text-[#885f3f]"> {unidade}</span>
        </p>

        <p>
          <span className="text-gray-500">Mensal:</span>{" "}
          <span className="font-semibold">{dados.mensal}</span>
          <span className=""> {unidade}</span>
        </p>

        <p>
          <span className="text-gray-500">Anual:</span>{" "}
          <span className="font-semibold">{dados.anual}</span>
          <span className=""> {unidade}</span>
        </p>
      </div>
    </div>
  );
}

export default ResumoCard;
