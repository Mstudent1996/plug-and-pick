import Header from "./Components/Header/Header.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";

import Home from "./Pages/Home/Home.jsx";
import Products from "./Pages/Products/Products.jsx";
import Contact from "./Pages/Contact/Contact.jsx";
import SingleProduct from "./Components/SingleProduct/SingleProduct.jsx";
import CategoryPage from "./Pages/CategoryPage/CategoryPage.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import Cookies from "./Components/Cookies/Cookies.jsx";
import Terms from "./Pages/Documents/Terms.jsx";
import CookiePolicy from "./Pages/Documents/CookiePolicy.jsx";
import PrivacyPolicy from "./Pages/Documents/PrivacyPolicy.jsx";
import Favorites from "./Pages/Favorites/Favorites.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <Header />
        <Cookies />

        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products/:id" element={<SingleProduct />} />
            <Route
              path="/products/category/:category"
              element={<CategoryPage />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/cookiepolicy" element={<CookiePolicy />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
