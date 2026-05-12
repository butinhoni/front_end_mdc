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

function GraficoBene({ dados }) {
  return (
    <ResponsiveContainer width="100%" height={330}>
      <BarChart data={dados}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dia" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="processado" fill="#885f3f" name="Processado" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default GraficoBene;
