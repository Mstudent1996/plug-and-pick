import Header from "./components/Header/Header.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";

import Home from "./pages/Home/Home.jsx";
import Products from "./pages/Products/Products.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import SingleProduct from "./components/SingleProduct/SingleProduct.jsx";
import CategoryPage from "./pages/CategoryPage/CategoryPage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Cookies from "./components/Cookies/Cookies.jsx";
import Terms from "./pages/Documents/Terms.jsx";
import CookiePolicy from "./pages/Documents/CookiePolicy.jsx";
import PrivacyPolicy from "./pages/Documents/PrivacyPolicy.jsx";
import Favorites from "./pages/Favorites/Favorites.jsx";

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
