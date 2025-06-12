import { useParams } from "react-router-dom"; // useParams bruges til at hente URL-parametre (slug)
import { useEffect, useState } from "react";
import styles from './CategoryPage.module.css'
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";


const CategoryPage = () => {
  const { category } = useParams(); // Trækker slugs fra URL'en
  const [products, setProducts] = useState([]); // State til produkter i den valgte kategori
  const [favorites, setFavorites] = useState([]); // State til favoriter
  const [cart, setCart] = useState([]); // State til kurv

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${category}`) // Kalder API'et når category ændrer sig
      .then((res) => res.json()) // Konverterer til JSON
      .then((data) => setProducts(data.products)); // Gemmer de hentede produkter i products
  }, [category]); // useEffect køres igen, hvis category ændrer sig

  // Hent favoritter og kurv fra localStorage
  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favorites")) || []; // Henter favoritter fra localStorage hvis der er nogle, ellers sættes et tomt array
    setFavorites(storedFavs); // Gemmer favorittet i state

    const storedCart = JSON.parse(localStorage.getItem("cart")) || []; // Henter kurv fra localStorage eller tomt array hvis ingen produkter findes
    setCart(storedCart); // Gemmer kurv i state
  }, []); // Køres kun ved første render

  useEffect(() => { // Funktion der kører, hvis favorites ændrer sig
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]); // Opdaterer localStorage med nye favoritter, køres kun når favorites ændres

  useEffect(() => { // Funktion der kører, hvis cart ændres
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]); // Opdaterer lovalStorage med nye produkter til kurv, køres kun når cart ændres

  const toggleFavorite = (product) => { // Funktion til at tilføje/fjerne et produkt til/fra favoritter
    const exists = favorites.find((item) => item.id === product.id); // Tjekker om produktet allerede findes i favoritter
    setFavorites(
      exists
        ? favorites.filter((item) => item.id !== product.id)
        : [...favorites, product] // Hvis det allerede er i gemt som favorit, fjernes det, ellers tilføjes det. 
    );
  };

  const toggleCart = (product) => {
    const exists = cart.find((item) => item.id === product.id); // Tjekker om produktet allerede ifndes i kurven
    setCart(
      exists
        ? cart.filter((item) => item.id !== product.id)
        : [...cart, product] // Hvis det findes fjernes det, ellers tilføjes det
    );
  };
  

  return (
    <div className={styles.productContainer}>
      <h1 className={styles.heading}>{category}</h1>

      <ul className={styles.productList}>
        {products.map((product) => { // Mapper igennem alle produkterne
          const isFavorite = favorites.some((fav) => fav.id === product.id); // Tjekker om produktet er gemt i favoritter
          const isInCart = cart.some((item) => item.id === product.id); // Tjekker om det er gemt i kurv

          return (
            <li key={product.id} className={styles.productCard}>
              <img
                src={product.thumbnail}
                alt={product.title}
                className={styles.productImg}
              />
              <div className={styles.discountBadge}>
                {product.discountPercentage.toFixed(2)}%
              </div> {/* Viser rabat afrundet til to decimaler */}
              <button
                onClick={() => toggleFavorite(product)}
                className={styles.favBtn}
                aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
              >
                {isFavorite ? "♥" : "♡"} {/* Knap til at tilføje/fjerne fra favoritter */}
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
                      {isInCart ? (
                        <MdRemoveShoppingCart />
                      ) : (
                        <MdAddShoppingCart />
                      )} {/* Knap til at tilføje/fjerne fra kurv */}
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryPage;
