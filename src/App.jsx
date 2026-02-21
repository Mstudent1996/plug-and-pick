import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";

import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Contact from "./pages/Contact/Contact";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import Footer from "./components/Footer/Footer";
import Cart from "./pages/Cart/Cart";
import Cookies from "./components/Cookies/Cookies";
import Terms from "./pages/Documents/Terms";
import CookiePolicy from "./pages/Documents/CookiePolicy";
import PrivacyPolicy from "./pages/Documents/PrivacyPolicy";
import Favorites from "./pages/Favorites/Favorites";

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
