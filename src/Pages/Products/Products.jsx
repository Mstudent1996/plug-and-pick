import { useState, useEffect } from 'react' /* Importer react hooks. Usestate bruges til at håndtere komponents tilstand. Useffect bruge til at håndtere sideefecter, fx at hente data */
import FilterPanel from "../../Components/FilterPanel/FilterPanel" /* Henter komponent til filtrering */
import Pagination from "../../Components/Pagination/Pagination" /* Henter komponent til sideinddeling */
import ProductList from "../../Components/ProductList/ProductList" /* Henter komponent til listen med produkter */
import styles from "./Products.module.css" /* Henter css */

const PRODUCTS_PER_PAGE = 12; /* Angiver hvor mange produkter der vises per side */

export default function Products() {
  const [allProducts, setAllProducts] = useState([]); // State til at gemme alle produkter
  const [filteredProducts, setFilteredProducts] = useState([]); // State til at gemme filtrerede produkter
  const [searchTerm, setSearchTerm] = useState(""); // State til søgefeltets indhold
  const [selectedCategory, setSelectedCategory] = useState(""); // State til kategorien der vælges
  const [sortOption, setSortOption] = useState(""); // State til sorteringensmuligheden der vælges
  const [currentPage, setCurrentPage] = useState(1); // State der viser hvilken side man er på, starter på 1

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=100");
        const data = await res.json();
        setAllProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error("error collecting:", error);
      }
    };
    fetchData();
  }, []);
  // Et tomt array fortæller at funktionen kun skal køres en gang.
  // Der hentes produkter fra API'et og sætter både allProducts state og filteredProducts state

  useEffect(() => {
    let filtered = [...allProducts];
    // Der laves en kopi af alle produkter
    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Der filtreres baseret på søgetekst

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    // Yderligere filtrering på den valgte kategory

    if (sortOption === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "title-asc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "title-desc") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "rating-asc") {
      filtered.sort((a, b) => a.rating - b.rating);
    } else if (sortOption === "rating-desc") {
      filtered.sort((a, b) => b.rating - a.rating);
    }
    // Der sorteres produkter alt efter hvilken sorteringsmulighed der vises

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [allProducts, searchTerm, selectedCategory, sortOption]);

  // Opdaterer den filtrerede liste og nulstiller den aktuelle side

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const indexOfLast = currentPage * PRODUCTS_PER_PAGE;

  const indexOfFirst = indexOfLast - PRODUCTS_PER_PAGE;

  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  // Der udregnes hvor mange sider der vises, og hvilke produkter der vises på den aktuelle side

  const categories = [...new Set(allProducts.map((p) => p.category))];
  // Der oprettes en liste med unikke kategorier fra alle produkterne

  return (
    <div className={styles.productPage}>
      <h1 className={styles.heading}>The shop</h1>
      <FilterPanel
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortOption={sortOption}
        setSortOption={setSortOption}
        categories={categories}
      />
      {/* Filterpanelet med props vises */}

      <p className={styles.foundProducts}>
        {filteredProducts.length} products found
      </p>
      {/* Viser hvor mange produkter der findes baseret på filtrering, søgning og standard */}

      <ProductList products={currentProducts} /> {/* Viser produkter på den aktuelle side */}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      {/* Viser nuværende side og antal sider */}
    </div>
  );
}
