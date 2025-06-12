import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import styles from './ProductList.module.css'
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";

export default function ProductList ({ products }) {
    const [favorites, setFavorites] = useState([]) // opretter en state til at håndtere favoritter
    const [cart, setCart] = useState([]); // opretter en state til at håndtere cart

    //Henter favoritter fra localstorage
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("favorites")) || [] // Henter favoritter fra localStorage. Hvis der ikke er nogle produkter gemt, benyttes en tom liste
        setFavorites(stored) // gemmer dem i favorites state
    }, []) // kører kun en gang


    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify (favorites))
    }, [favorites]) // Hver gang favorites ændres, gemmes den nye liste i localStorage

    const toggleFavorite = (product) => {
      setFavorites((prev) => {
        const exists = prev.find((item) => item.id === product.id); // Tjekker om produktet allerede er i favorites
        if (exists) {
          return prev.filter((item) => item.id !== product.id); // Det fjernes hvis det findes
        } else {
          return [...prev, product]; // Det tilføjes hvis det ikke gør
        }
      }); 
    };
    
    useEffect(() => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || []; // Når komponent loader, hentes tidligere indhold fra kurven
      setCart(storedCart); // state opdateres
    }, []);

    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]); // Hver gang cart ændres opdateres localStorage

    const toggleCart = (product) => {
      const exists = cart.find((item) => item.id === product.id); // Tjekker om produktet findes i kurven
      if (exists) { 
        setCart(cart.filter((item) => item.id !== product.id)); // Hvis ja, fjernes det
      } else {
        setCart([...cart, product]); // Hvis nej, tilføjes det
      }
    };

    return (
      <div className={styles.productContainer}>
      <ul className={styles.productList}>
        {products.map((product) => {
          const isFavorite = favorites.some((fav) => fav.id === product.id)
          
          return (
            <li key={product.id} className={styles.productCard}>
              <img
                src={product.thumbnail}
                alt={product.title}
                className={styles.productImg}
              />
              <div className={styles.discountBadge}>
                {product.discountPercentage.toFixed(2)}%
              </div>
              <button
                onClick={() => toggleFavorite(product)}
                aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
                className={styles.favBtn}
              >
                {isFavorite ? "♥" : "♡"}
              </button>
              <div className={styles.content}>
                <h3>{product.title}</h3>
                <p>{product.category}</p>
                <div className={styles.contentBottom}>
                  <b>{product.price}$</b>
                  <div className={styles.buttons}>
                    <Link to={`/products/${product.id}`}>
                      <button className={styles.detailsBtn}>Detail</button>
                    </Link>
                    <button
                      className={styles.cartBtn}
                      onClick={() => toggleCart(product)}
                    >
                      {cart.some((item) => item.id === product.id) ? (
                        <MdRemoveShoppingCart />
                      ) : (
                        <MdAddShoppingCart />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
    )
}