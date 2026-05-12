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
        <Bar dataKey="producao" fill="#d6ad6b" name="Ouro Produzido" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default GraficoBene;
