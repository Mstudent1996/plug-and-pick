import styles from './FilterPanel.module.css'

export default function FilterPanel({
    searchTerm, // den aktuelle søgetekst
    setSearchTerm, // funktion til at opdatere søgeteksten
    selectedCategory, // den valgte kategori
    setSelectedCategory, // funktion til at opdatere den valgte kategori
    sortOption, // den valgte sorteringstype
    setSortOption, // funktion til at opdatere den valgte sorteringstype
    categories, // en liste over alle tilgængelige kategorier
}) {

    return (
      <div className={styles.filterPanel}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm} // Styres af det man skriver 
          onChange={(e) => setSearchTerm(e.target.value)} // opdaterer state
          className={styles.searchBar}
        />

        <div className={styles.sortingContainer}>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}  // opdaterer state
          className={styles.categories}
          >
          <option value="">All categories</option> 
          {categories.map((cat) => ( // henter dynamisk kategorierne
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)} // opdaterer state
          className={styles.sorting}
          >
            <option value="">No sorting</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="title-asc">Name: A → Z</option>
            <option value="title-desc">Name: Z → A</option>
            <option value="rating-asc">Rating: Low → High</option>
            <option value="rating-desc">Rating: High → Low</option>
        </select>
          </div>
      </div>
    );
}