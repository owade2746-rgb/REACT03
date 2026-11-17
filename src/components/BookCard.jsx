function BookCard({ titre, auteur, estDisponible, onClickEmprunt }) {
  return (
    <div style={{
      padding: "15px",
      margin: "10px",
      borderRadius: "10px",
      border: "2px solid black",
      width: "250px",
    }}>
      <h2>{titre}</h2>

      <p>Auteur : {auteur}</p>

      <p>
        Statut : {estDisponible ? "🟢 Disponible" : "🔴 Emprunté"}
      </p>

      <button
        onClick={onClickEmprunt}
        style={{
          backgroundColor: estDisponible ? "green" : "red",
          color: "white",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {estDisponible ? "Emprunter" : "Rendre"}
      </button>
    </div>
  );
}

export default BookCard;