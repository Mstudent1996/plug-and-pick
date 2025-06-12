import styles from './Pagination.module.css'

export default function Pagination ({
    currentPage, // den aktuelle side
    totalPages, // total antal sider
    setCurrentPage, // funktion til at ændre siden
}) {
    return (
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage(currentPage - 1)} // trækker 1 fra currentPage
          disabled={currentPage === 1} // deaktiveres på første side
          className={styles.button}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages} 
        </span> {/* den aktuelle side af samlede antal sider */}

        <button
          onClick={() => setCurrentPage(currentPage + 1)} // lægger 1 til currentPage
          disabled={currentPage === totalPages} // deaktivere på den sidste side
          className={styles.button}
        >
          Next
        </button>
      </div>
    );
}