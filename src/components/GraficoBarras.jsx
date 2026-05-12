import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

function GraficoBarras({ dados }) {
  return (
    <ResponsiveContainer width="100%" height={330}>
      <BarChart data={dados}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dia" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="minerio" fill="#885f3f" name="Minério" />
        <Bar dataKey="esteril" fill="#d6ad6b" name="Estéril" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default GraficoBarras;
