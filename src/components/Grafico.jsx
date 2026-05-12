import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function Grafico({ dados }) {
  return (
    <LineChart width={500} height={300} data={dados}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="dia" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="processado" />
    </LineChart>
  );
}

export default Grafico;
