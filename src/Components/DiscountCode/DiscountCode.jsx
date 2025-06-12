import { useState } from 'react'
import styles from './DiscountCode.module.css'

const validCodes = {
  SUMMER10: { type: "percent", value: 10 },
  FREESHIPPING: { type: "freeShipping" },
  SAVE5: { type: "fixed", value: 5 },
}; // Tre rabatkoder


export default function DiscountCode({ onApply }) { // Funktion bruges til at give besked om rabatkoden videre til andre komponenter
  const [code, setCode] = useState(""); // Holder værdien af det der skrives i inputfeltet
  const [message, setMessage] = useState(""); // Bruges til at være en fejlbesked eller bekræftelse under inputfeltet

  const handleApply = () => {
    const trimmed = code.trim().toUpperCase(); // Koden er case-insensitive så der fjernes mellemrum og store/små bogstaver forskelle
    if (validCodes.hasOwnProperty(trimmed)) { // Tjekker om koden findes i validCodes
      const discount = validCodes[trimmed]; // Henter rabat-objektet
      setMessage(`Discount code "${trimmed}" applied.`);
      onApply(discount); // Sætter en besked om at koden er godkendt og kalder onApply funktionen
    } else {
      setMessage("Invalid discount code"); // Viser fejlbesked
      onApply(null); // Nulstiller rabatten
    }
  };
  

  return (
    <div className={styles.wrapper}>
        <h3>Type discountcode here</h3>
        <div className={styles.inputGroup}>
            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder='Example: DISCOUNT10' className={styles.input} /> 
            <button onClick={handleApply} className={styles.button}>Use discount</button> {/* Knaper der aktiverer handleApply */}
        </div>

        {message && <p className={styles.message}>{message}</p>} {/* Fejl/success besked vises her */}
    </div>
  )
}