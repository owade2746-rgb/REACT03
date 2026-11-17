
import { useState } from "react";
import BookCard from "./components/BookCard";

function App() {

  const [books, setBooks] = useState([
    { id: 1, titre: "L'enfant noir", auteur: "Camara Laye", estDisponible: true },
    { id: 2, titre: "Une si longue lettre", auteur: "Mariama Bâ", estDisponible: true },
    { id: 3, titre: "Le petit prince", auteur: "Antoine de Saint-Exupéry", estDisponible: false },
    { id: 4, titre: "Les bouts de bois de Dieu", auteur: "Ousmane Sembène", estDisponible: true }
  ]);

  const [titre, setTitre] = useState("");
  const [auteur, setAuteur] = useState("");

  // Calcul du nombre de livres disponibles
  const totalDisponible = books.filter(book => book.estDisponible).length;

  // Fonction pour emprunter ou rendre un livre
  function onClickEmprunt(bookId) {
    const nouveauxLivres = books.map(book =>
      book.id === bookId
        ? { ...book, estDisponible: !book.estDisponible }
        : book
    );

    setBooks(nouveauxLivres);
  }

  // Fonction pour ajouter un livre
  function ajouterLivre(e) {
    e.preventDefault();

    if (titre.trim() === "" || auteur.trim() === "") {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const nouveauLivre = {
      id: Date.now(),
      titre: titre,
      auteur: auteur,
      estDisponible: true
    };

    setBooks([...books, nouveauLivre]);

    setTitre("");
    setAuteur("");
  }

  return (
    <div className="container">
      <h1>Bibliothèque universitaire</h1>

      <h2>Livres disponibles : {totalDisponible}</h2>

      <form onSubmit={ajouterLivre}>
        <input
          type="text"
          placeholder="Titre du livre"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
        />

        <input
          type="text"
          placeholder="Nom de l'auteur"
          value={auteur}
          onChange={(e) => setAuteur(e.target.value)}
        />

        <button type="submit">Ajouter un livre</button>
      </form>

      <div className="books">
        {books.map(book => (
          <BookCard
            key={book.id}
            titre={book.titre}
            auteur={book.auteur}
            estDisponible={book.estDisponible}
            onClickEmprunt={() => onClickEmprunt(book.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
