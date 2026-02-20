import Header from "./components/Header/Header"; // Importerer header funktionalitet
import { Routes, Route } from 'react-router-dom' // Importerer routes og route der bruges til at håndtere url-ruter
import styles from './App.module.css' // Importerer css
import Home from './pages/Home/Home' // Importerer Home page til brug i navigation
import Products from './pages/Products/Products'
import Contact from './pages/Contact/Contact'
import SingleProduct from './components/SingleProduct/SingleProduct'
import CategoryPage from './pages/CategoryPage/CategoryPage'
import Footer from './components/Footer/Footer'
import Cart from './pages/Cart/Cart'
import Cookies from './components/Cookies/Cookies'
import Terms from "./pages/Documents/Terms"
import CookiePolicy from "./pages/Documents/CookiePolicy"
import PrivacyPolicy from "./pages/Documents/PrivacyPolicy"
import Favorites from './pages/Favorites/Favorites'

export default function App() { // Starter en react komponent og eksporterer den
return (
  <div className={styles.container}> 
    <Header /> {/* Viser header komponent */}
    <Cookies /> {/* Viser cookie komponent */}
    <main className={styles.main}> {/* Starter området for det primære indhold */}
      <Routes> {/* Indeholder alle routes */}
        <Route path="/" element={<Home />} /> 
        <Route path="/products" element={<Products />} /> {/* Linker til produktsiden */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:id" element={<SingleProduct />} /> {/* Skaber en dynamisk side baseret på produktets id */}
        <Route path="/products/category/:category" element={<CategoryPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Terms" element={<Terms />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/CookiePolicy" element={<CookiePolicy />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </main>

    <Footer /> {/* Viser footer komponent */}
  </div>
);
}