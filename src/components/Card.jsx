function Card({ titulo, valor }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        width: "200px",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <h3>{titulo}</h3>
      <h2>{valor}</h2>
    </div>
  );
}

export default Card;
