import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import styles from "./SingleProduct.module.css";

export default function SingleProduct() {
  const { id } = useParams(); // Bruges til at hente produktets id fra URL'en
  const [product, setProduct] = useState(null); // Håndtering af produktet
  const [favorites, setFavorites] = useState([]); // Håndtering af favorit
  const [cart, setCart] = useState([]); // Håndtering af kurv

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`) // Køres ved første loading eller når id ændrer sig
      .then((res) => res.json()) // Konventerer til JSON
      .then((data) => setProduct(data)); // Gemmer data i product
  }, [id]); // effekten afhænger af id'et

  useEffect(() => {
    // Når komponenten loader (eller når produktet ændrer sig), hentes favoritlisten fra localStorage
    const stored = JSON.parse(localStorage.getItem("favorites")) || []; // Forsøger at hente 'favorites' fra localStorage – og parser det som JSON
    setFavorites(stored); // Opdaterer vores state med listen af favoritter
  }, [product]); // Her lytter vi på 'product', så effekten kører igen hver gang man åbner et nyt produkt

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites)); // Gemmer favorites i localStorage som tekst
  }, [favorites]); // Effekten afhænger af favorites

  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      // Opdaterer favorites baseret på tidligere værdi
      const exists = prev.find((item) => item.id === product.id); // Tjekker om produktet allerede findes
      return exists
        ? prev.filter((item) => item.id !== product.id) // Hvis det findes, fjernes det
        : [...prev, product]; // ellers tilføjes det
    });
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || []; // Henter kurvdata fra localStorage eller en tom liste, hvis der ikke er data
    setCart(storedCart); // sætter cart med det hented
  }, []); // kører kun ved første rendering

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart)); // Gemmer kurven i localStorage
  }, [cart]); // effekten afhænger af cart

  const toggleCart = (product) => {
    const exists = cart.find((item) => item.id === product.id); // Tjekker om produktet er i kurven
    setCart(
      exists
        ? cart.filter((item) => item.id !== product.id) // hvis det findes, fjernes det
        : [...cart, product] // ellers tilføjes det
    );
  };

  const isInCart = (id) => cart.some((item) => item.id === id); // fuktionen returneres true hvis det aktuelle produktet findes i kurven
  const isFavorite = favorites.some((item) => item.id === product?.id); // der tjekkes om det aktuelle produkt er gemt som favorit

  if (!product) return <p>Loading...</p>; // Loading tekst

  return (
    <div className={styles.productContainer}>
      <div className={styles.productCard}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.productImg}
        />
        <button
          onClick={() => toggleFavorite(product)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className={styles.favBtn}
        >
          {isFavorite ? "♥" : "♡"}
        </button>

        <div className={styles.content}>
          <h3>{product.title}</h3>
          <p>{product.rating}/5 ★</p>
          <p>{product.description}</p>
          <div className={styles.priceContainer}>
            <b>{product.price}</b>
            <div className={styles.discountBadge}>
              {product.discountPercentage}%
            </div>
          </div>
          <div className={styles.buttons}>
            <button
              className={styles.addToCart}
              onClick={() => toggleCart(product)}
            >
              {isInCart(product.id) ? "Remove from cart" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>

      <h3>Product info</h3>
      <div className={styles.productInfoContainer}>
        <p>Brand: {product.brand}</p>
        <p>Weight: {product.weight} grams</p>
        <p>Width: {product.dimensions.width} cm</p>
        <p>Height: {product.dimensions.height} cm</p>
        <p>Dept: {product.dimensions.depth} cm</p>
      </div>
    </div>
  );
}
