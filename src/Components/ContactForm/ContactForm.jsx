import { useState } from "react"; 
import styles from "./ContactForm.module.css"

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    }) // En state variabel med tre felter. setFormData bruges til at opdatere dem

    // Funktion der håndterer ændringer i input
    const handleChange = (e) => {
        const { name, value } = e.target // Udtrækker navn og værdi fra inputetfeltet der benyttes
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        })) // Opdaterer den specifikke nøgle
    }

    // Funktion der håndterer submit knappen
    const handleSubmit = (e) => {
        e.preventDefault() // Fohindrer browserens standard-opførsel
        console.log("Formular sendt", formData) // Udskriver formularens data til konsollen
        alert("Thank you for your message. We strive to get back to you as soon as possible") // Viser en pop-up besked
        setFormData({ name: "", email: "", message: ""}) // Nulstiller formuleren til tomme felter efter afsendelse
    }

    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Contact us here</h2>

        <input
          name="name"
          type="text"
          placeholder="Type your name"
          value={formData.name}
          onChange={handleChange} // Bruger handleChange ved ændringer i feltet
          className={styles.input}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Type your email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <input
          name="message"
          type="text"
          placeholder="Type your message"
          value={formData.message}
          onChange={handleChange}
          className={styles.textarea}
          required
        />

        <button className={styles.button}>Send</button>
      </form>
    );
}

export default ContactForm