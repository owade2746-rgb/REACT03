# 📚 TP React : Catalogue de livres

**Nom :** [Ton prénom et nom]
**Classe :** [Ta classe / filière]
**Cours :** React JS, Mme Aicha DIAGNE

## Présentation

Dans ce TP, j'ai développé une petite application de gestion de catalogue de livres pour une bibliothèque universitaire, avec React et Vite. L'application affiche une liste de livres, permet de les emprunter ou de les rendre, et permet d'en ajouter de nouveaux avec un formulaire.

## Comment j'ai fait le travail

### Étape 1 : Initialisation du projet

J'ai ouvert PowerShell dans mon dossier de cours et j'ai créé le projet avec la commande :

```bash
npm create vite@latest 03
```

J'ai choisi **React** puis **JavaScript**. Ensuite j'ai installé les dépendances et lancé le serveur :

```bash
cd 03
npm install
npm run dev
```

J'ai ouvert le projet dans VS Code. J'ai supprimé les fichiers inutiles (`App.css` et `assets/react.svg`), vidé `index.css`, puis créé le dossier `src/components`.

### Étape 2 : Création du composant BookCard

Dans `src/components`, j'ai créé le fichier `BookCard.jsx`. C'est un composant enfant qui reçoit 4 props : `titre`, `auteur`, `estDisponible` et `onClickEmprunt`.

- J'ai affiché le titre et l'auteur dans une carte avec une bordure, un padding et des coins arrondis (`borderRadius`).
- Pour le statut, j'ai utilisé un **ternaire** : si `estDisponible` est vrai, j'affiche « 🟢 Disponible », sinon « 🔴 Emprunté ».
- J'ai ajouté un bouton avec `onClick={onClickEmprunt}`. Son texte est « Emprunter » si le livre est disponible, sinon « Rendre ».

```jsx
<p>{estDisponible ? '🟢 Disponible' : '🔴 Emprunté'}</p>
<button onClick={onClickEmprunt}>
  {estDisponible ? 'Emprunter' : 'Rendre'}
</button>
```

### Étape 3 : Affichage dynamique dans App.jsx

Dans `App.jsx`, j'ai importé `useState` et `BookCard`. J'ai créé l'état `books` avec un tableau de 4 livres. Chaque livre est un objet avec `id`, `titre`, `auteur` et `estDisponible`.

Pour afficher le nombre de livres disponibles en temps réel, j'ai utilisé `.filter()` :

```jsx
const nbDisponibles = books.filter((book) => book.estDisponible).length
```

Puis j'ai utilisé `.map()` pour afficher un `BookCard` par livre, avec l'attribut `key={book.id}` pour que chaque élément soit unique :

```jsx
{books.map((book) => (
  <BookCard
    key={book.id}
    titre={book.titre}
    auteur={book.auteur}
    estDisponible={book.estDisponible}
    onClickEmprunt={() => onClickEmprunt(book.id)}
  />
))}
```

### Étape 4 : Interactivité et formulaire d'ajout

**Gestion de l'emprunt.** J'ai créé la fonction `onClickEmprunt(bookId)`. Elle parcourt les livres avec `.map()` et inverse `estDisponible` uniquement pour le livre cliqué. Je n'ai pas modifié `books` directement : j'ai créé un nouveau tableau avec `setBooks`, pour que React rafraîchisse l'affichage.

```jsx
setBooks(
  books.map((book) =>
    book.id === bookId ? { ...book, estDisponible: !book.estDisponible } : book
  )
)
```

**Formulaire d'ajout.** J'ai créé deux états, `titre` et `auteur`, reliés aux champs avec `value` et `onChange` (champs contrôlés). À la soumission (`onSubmit`) :

1. j'empêche le rechargement de la page avec `e.preventDefault()`,
2. je vérifie que les champs ne sont pas vides avec `trim()`,
3. j'ajoute le nouveau livre à `books`, disponible par défaut,
4. je vide les champs avec `setTitre('')` et `setAuteur('')`.

## Ce que j'ai appris

- Un **composant** est une fonction qui retourne du JSX, et son nom commence par une majuscule.
- Les **props** sont envoyées du parent vers l'enfant et sont en lecture seule.
- `.map()` transforme un tableau en liste de composants, et chaque élément a besoin d'une `key` unique.
- `useState` crée la mémoire du composant : quand on modifie l'état avec `set...`, React met à jour l'écran.

## Lancer le projet

```bash
git clone https://github.com/<ton-pseudo>/<nom-du-depot>.git
cd <nom-du-depot>
npm install
npm run dev
```

Puis ouvrir <http://localhost:5173> dans le navigateur.
