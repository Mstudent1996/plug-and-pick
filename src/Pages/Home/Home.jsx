import { useEffect, useState } from "react"; // Importer react hooks, usestate til tilstand, useffect til sideefekter
import styles from "./Home.module.css"; // importer css
import { Link } from "react-router-dom"; // Link bruges til navigation uden reload
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md"; // Ikoner til kurv

export default function Home() {
  const [products, setProducts] = useState([]); // State til at gemme fremhævede produkter
  const [favorites, setFavorites] = useState([]); // State til at gemme favoritter
  const [categories, setCategories] = useState([]); // State til at gemme produktkategorier
  const [cart, setCart] = useState([]); // State til at holde styr på varer i kurven

  const categoryStyles = { // Objekt med visuel data til hver kategori
    beauty: { icon: "💄" },
    fragrances: { icon: "🌸" },
    furniture: { icon: "🛋️" },
    groceries: { icon: "🛒" },
    "home-decoration": { icon: "🏡" },
    "kitchen-accessories": { icon: "🍽️" },
    laptops: { icon: "💻" },
    "mens-shirts": { icon: "👔" },
    "mens-shoes": { icon: "👞" },
    "mens-watches": { icon: "⌚" },
    "mobile-accessories": { icon: "📱" },
    motorcycle: { icon: "🏍️" },
    "skin-care": { icon: "🧴" },
    smartphones: { icon: "📱" },
    "sports-accessories": { icon: "🎽" },
    sunglasses: { icon: "🕶️" },
    tablets: { icon: "💻" },
    tops: { icon: "👕" },
    vehicle: { icon: "🚗" },
    "womens-bags": { icon: "👜" },
    "womens-dresses": { icon: "👗" },
    "womens-jewellery": { icon: "💍" },
    "womens-shoes": { icon: "👠" },
    "womens-watches": { icon: "⌚" },
  };

  useEffect(() => { // Starter en useefect for at hente produkter
    fetch("https://dummyjson.com/products") // Fetcher produktdata fra API
      .then((res) => res.json()) // Konverterer til JSON
      .then((data) => {
        const shuffled = data.products.sort(() => 0.5 - Math.random()); // Laver et tilfældigt udvalg af produkter. Det er en random sort operatorer der retunere et tal mellem -0.5-+0.5 og Math.Random et tal mellem 0-1. Sort kan så sammenligne de to elementer og giver et tilfældigt resultat
        setProducts(shuffled.slice(0, 4)); // Viser de første 4 produkter i state
      });

    const storedFavorites = JSON.parse(localStorage.getItem ("favorites")) || []; // Henter favoritter fra localStorage hvis de findes. Parse konvereter til et objekt. 
    setFavorites(storedFavorites); // Sætter favoritter i state
  }, []);

  useEffect(() => { // Henter kategorier fra API
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json()) // Konvereter til JSON
      .then((data) => {
        console.log("KATEGORIER I FETCH:", data); // Logger kategorierne i konsollen til debug
        setCategories(data); // Gemmer kategorierne i state
      });
  }, []);

  const toggleFavorite = (product) => { // Funktion til at tilføje/fjerne et produkt som favorit
    const isAlreadyFavorite = favorites.some((fav) => fav.id === product.id); // Tjekker om produktet allerede er en favorit
    let updatedFavorites; // Laver en midlertidig variabel til en opdateret liste

    if (isAlreadyFavorite) { // isAlreadyFavorite er en boolean der bruges til at fortælle om den er i favoritter eller ej
      updatedFavorites = favorites.filter((fav) => fav.id !== product.id); // Hvis produktet allerede er en favorit, fjernes det
    } else {
      updatedFavorites = [...favorites, product];
    } // Ellers tilføjes det

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Opdater både state og localStorage
  };

  useEffect(() => { 
    const storedCart = JSON.parse(localStorage.getItem("cart")) || []; // Der hentes data fra localStorage og det gemmes som en string, hvor parse laver det til et array igen
    setCart(storedCart); // State opdateres med det der blev fundet i localStorage
  }, []); // tomt array betyder effekten kun kører en gang når siden loades

  const toggleCart = (product) => { // Funktion til at tilføje/fjerne et produkt fra kurv
    const isInCart = cart.some((item) => item.id === product.id); // Der tjekkes om produktet allerede er i kurven
    let updatedCart; // Der laves en midlertidig variabel til den nye version af kurven

    if (isInCart) { 
      updatedCart = cart.filter((item) => item.id !== product.id); // Hvis produktet allerede findes i kurven fjernes det og der skabes en ny liste uden produktet
    } else {
      updatedCart = [...cart, product];
    } // Hvis produktet ikke findes oprettes et nyt array med det gamle indhold og det nye produkt

    setCart(updatedCart); // Opdaterer state med den nye kurv
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }; // Kurven gemmes i localstorage

  return (
    <div className={styles.container}>
      {/* Hero billede */}
      <img
        src="https://images.unsplash.com/photo-1572578024193-08bed9d36085?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className={styles.heroImg}
        alt="Hero"
      />

      {/* Intro tekst med call to action knap der fører til produkterne */}
      <div className={styles.heroBox}>
        <h1>Welcome to Plug & Pick</h1>
        <p>Your one-stop shop for all things awesome.</p>
        <Link to="/products" className={styles.heroButton}>
          Shop Now
        </Link>
      </div>
      {/* Extra information */}
      <div className={styles.extraInfo}>
        <p>Free Shipping</p>
        <p>Next Day Shipping</p>
        <p>14 days return policy</p>
      </div>

      {/* Viser 4 tilfældige produkter */}
      <div className={styles.featuredContainer}>
        <h2>Featured products</h2>
        <ul className={styles.topProducts}>
          {products.map((product) => {
            const isFavorite = favorites.some((fav) => fav.id === product.id); // Tjekker om produktet er blandt favoritter

            return (
              <li key={product.id} className={styles.productCard}>
                {/* Produkt billede */}
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className={styles.productImg}
                />
                {/* Tilbuds procent */}
                <div className={styles.discountBadge}>
                  {product.discountPercentage}%
                </div>
                {/* Fjern eller tilføj til favoritter */}
                <button
                  onClick={() => toggleFavorite(product)}
                  aria-label={
                    // aria-label er hjælp til skærmlæsere
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                  className={styles.favBtn}
                >
                  {isFavorite ? "♥" : "♡"}
                </button>
                <div className={styles.content}>
                  {/* Produktets navn */}
                  <h3>{product.title}</h3>
                  {/* Produktets kategori */}
                  <p>{product.category}</p>
                  <div className={styles.contentBottom}>
                    {/* Produktets pris */}
                    <b>{product.price}$</b>
                    <div className={styles.buttons}>
                      {/* Knap til enkeltvisning af produkt */}
                      <Link to={`/products/${product.id}`}>
                        <button className={styles.detailsBtn}>Detail</button>
                      </Link>
                      {/* Tilføj eller fjern fra kurv */}
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

      <div className={styles.categories}>
        <h2>Shop by category</h2>
        <div className={styles.categoryContainer}>
          {/* Gennemgår hvert element i category-arrayet */}
          {categories.map((category) => (
            /* Der linkes til de enkelte kategorier så kun produkterne i den kategori vises */
            <Link
              to={`/products/category/${category.slug}`}
              key={category.slug} // Kategorierne er et slug, som er en URL-venlig tekststreng. Den bruges ofte ved længere navn fx mens-watches
              className={`${styles.categoryCard} ${
                styles[category.slug] || ""
              }`} // Der bruges slug i className for at kunne style hver enkelt kategori unikt
            >
              <div className={styles.iconContainer}>
                <span className={styles.name}>{category.name}</span>
                <span className={styles.icon}>
                  {categoryStyles[category.slug]?.icon || "❓"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.cta}>
        <h2>Waste no time!</h2>
        <h3>Check out our amazing deals right now!</h3>
        <Link to={"/products"}>
          <button className={styles.shopBtn}>Shop now!</button>
        </Link>
      </div>
    </div>
  );
}
