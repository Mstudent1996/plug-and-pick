import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"; // useForm bruges til at håndtere formularer
import styles from "./Cart.module.css";
import DiscountCode from "../../Components/DiscountCode/DiscountCode"; // Discount komponent til udregning af rabat
import { FaTrash } from "react-icons/fa";

export default function Cart() {
  // register kobler inputfelter til formularen, handleSubmit sørger for korrekt håndtering af formuleren, errors til fejl ved validering
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [products, setProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }); // Henter kurv fra localStorage, er der ikke noget i kurven bruges en tom liste
  const [discount, setDiscount] = useState(null); // Holder styr på aktiv rabatkode
  const shippingFee = 30; // Fragtpris bruges i beregninger

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || []; // Henter kurv fra localStorage, er der ikke noget i kurv bruges en tom liste
    setProducts(storedCart); // Opdaterer products state
  }, []);

  const updateCart = (updated) => {
    setProducts(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  }; // Opdaterer kurv i både react og localStorage

  const removeProduct = (id) => {
    const updated = products.filter((item) => item.id !== id);
    updateCart(updated);
  }; // Fjernet produktet

  const calculateTotal = () => {
    const subtotal = products.reduce((sum, item) => sum + item.price, 0);
    let total = subtotal + shippingFee;
    // Udregner subtotal og tilføjer fragt
    
    if (discount) {
      if (discount.type === "percent") {
        total -= (subtotal * discount.value) / 100;
      } else if (discount.type === "fixed") {
        total -= discount.value;
      } else if (discount.type === "freeShipping") {
        total -= shippingFee;
      }
    }

    // Hvis der er rabat, trækkes procent, fast værdi eller gratis fragt fra

    return total > 0 ? total : 0; // Sikrer at et tal aldrig bliver negativt
  };

  const onSubmit = (data) => {
    alert(
      `Thank you for your order, ${data.name}. Total: ${calculateTotal()}$`
    );
    localStorage.removeItem("cart");
    setProducts([]);
  }; // Viser en alert med kundens navn og totalpris. Kurv slettes fra localStorage og products nulstilles

  return (
    <div className={styles.container}>
      <h2>Checkout</h2>

      {products.length === 0 ? (
        <p>Your cart is empty</p> /* Tekst vises hvis der ikke er nogle produkter i kurven */
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          <div className={styles.columns}>
            <div className={styles.products}>
              {products.map((product) => ( 
                <div key={product.id} className={styles.productCard}>
                  <button
                    type="button"
                    onClick={() => removeProduct(product.id)}
                    className={styles.removeButton}
                  >
                    <FaTrash />
                  </button>
                  <h4>{product.title}</h4>
                  <img src={product.thumbnail} alt={product.title} />
                  <p>Price: {product.price}$</p>
                </div>
              ))}
            </div>

            <div className={styles.form}>
              <label>Name</label>
              <input {...register("name", { required: true })} />
              {errors.name && <p className={styles.error}>Name is required</p>}

              <label>Email</label>
              <input {...register("email", { required: true })} />
              {errors.email && (
                <p className={styles.error}>Email is required</p>
              )}

              <label>Address</label>
              <input {...register("address", { required: true })} />
              {errors.address && (
                <p className={styles.error}>Address is required</p>
              )} 
              {/* Inputfelter med validering og fejlbesked */}

              <p>
                Shipping:{" "}
                {discount?.type === "freeShipping" ? "0$" : `${shippingFee}$`}
              </p> {/* Viser fragtpris, 0 hvis der er gratis fragt */}

              <DiscountCode onApply={setDiscount} /> {/* DiscountCode komponent kaldes og onApply sætter rabat objektet */}

              <h3>Total: {calculateTotal()}$</h3> {/* Den totale pris vises */}

              <button type="submit" className={styles.button}>
                Confirm order
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
