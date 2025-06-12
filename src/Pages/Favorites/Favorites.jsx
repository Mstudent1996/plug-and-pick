import { useEffect, useState } from "react"; // Hooks importeres. 
import styles from "./Favorites.module.css"; // CSS importeres
import { FaTrash } from "react-icons/fa"; // Ikon til fjernelse

const Favorites = () => {
    const [favorites, setFavorites] = useState(() => {
      return JSON.parse(localStorage.getItem("favorites")) || [];
    }); // Der oprettes et state til favoritter og de eksisterende favoritter hentes fra localStorage og de ændres fra tekst til et JavaScript-array ved brug af parse. Hvis der ikke findes noget, bruges der en tom liste 
      
  useEffect(() => { 
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]); // Hver gang favorites ændrer sig gemmes den i localStorage
  
  const removeFromFavorites = (id) => { // Funktion der fjerner et produkt fra favoritter
    const updatedFavorites = favorites.filter((product) => product.id !== id); // Filtrer listen så produktet fjernes
    setFavorites(updatedFavorites); // Opdaterer favorites state
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Gemmer den nye liste i localStorage uden de fjernede produkter
  };

  return (
    <div className={styles.container}>
      <h2>Your favorites</h2>
      {favorites.length === 0 ? (
        <p>You have no favorites yet</p> // Der vises en besked, hvis ingen produkter er gemt som favorit
      ) : (
        <div className={styles.grid}> {/* Hvis der er favoritter, vises de i et grid */}
          {favorites.map((product) => (
            <div key={product.id} className={styles.card}>
              {/* Hvert produkt vises som et card */}
              <button
                onClick={() => removeFromFavorites(product.id)}
                className={styles.removeBtn}
                title="Fjern fra favoritter"
              >
                <FaTrash />
              </button> {/* Knap der fjerner produktet */}
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.price}$</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
